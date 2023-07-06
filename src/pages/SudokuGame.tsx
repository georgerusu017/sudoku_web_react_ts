import React, { useCallback, useEffect, useMemo, useState } from "react";
import GameBoard from "../components/GameBoard/GameBoard";
import ControlBoard from "../components/ControlBoard/ControlBoard";
import "../pages/SudokuGame.css";
import { Cell } from "../models/Cell.model";
import { generateDummyCells, generateSudoku } from "../services/sudoku.service";
import {
  calculateSelectedCellNewPosition,
  decreaseInvalidCount,
  highlightCells,
  increaseInvalidCount,
} from "../services/cellManipulation.service";
import { CellHistoryItem } from "../models/History.model";
import { TimeControl } from "../components/TimeControl/TimeControl";
import { Timer } from "../models/Timer.model";
import { getGameBoardClassName } from "../services/layout.service";

export default function SudokuGame() {
  const [cells, setCells] = useState<Cell[]>(generateSudoku);
  const [selectedCell, setSelectedCell] = useState<Cell>(cells[0]);
  const [notesToggle, setNotesToggle] = useState<boolean>(false);
  const [history, setHistory] = useState<CellHistoryItem[]>([]);
  const [timer, setTimer] = useState<Timer>({ minutes: 0, seconds: 0 });
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const dummyCells = useMemo(() => generateDummyCells(), []);

  function timerToggle() {
    setIsTimerRunning((prev) => !prev);
  }

  useEffect(() => {
    if (!isTimerRunning) {
      return;
    }
    const timerInterval = setInterval(() => {
      if (timer.seconds < 59) {
        timer.seconds++;
      } else {
        timer.minutes++;
        timer.seconds = 0;
      }
      setTimer({ minutes: timer.minutes, seconds: timer.seconds });
    }, 1000);
    return () => clearInterval(timerInterval);
  }, [isTimerRunning, timer]);

  const addToHistory = useCallback(() => {
    if (!selectedCell.isEditable) {
      return;
    }
    const cellHistoryItem = {
      value: selectedCell.value,
      noteValues: [...selectedCell.noteValues],
      index: cells.indexOf(selectedCell),
    };
    const newHistory = [...history, cellHistoryItem];
    setHistory(newHistory);
  }, [cells, history, selectedCell]);

  const handleSelectedCell = useCallback(
    (cell: Cell) => {
      if (!isTimerRunning) {
        setIsTimerRunning(true);
        return;
      }
      const newCells = [...cells];

      highlightCells(cell, newCells);
      setSelectedCell(cell);
      setCells(newCells);
    },
    [cells, isTimerRunning]
  );

  const handleNewGame = useCallback(() => {
    const newCells = generateSudoku();
    setTimer({minutes: 0, seconds: 0})
    setIsTimerRunning(true)
    setHistory([]);
    highlightCells(newCells[0], newCells);
    setNotesToggle(false);
    setHistory([]);

    setCells(newCells);
    setSelectedCell(newCells[0]);
  }, []);

  useEffect(() => {
    handleSelectedCell(cells[0]);
  }, []);

  const handleArrowKeyPress = useCallback(
    (key: string) => {
      if (!isTimerRunning) {
        setIsTimerRunning(true);
        return;
      }
      const newId = calculateSelectedCellNewPosition(selectedCell, key);
      const newSelectedCell = cells.find((cell) => cell.id === newId);

      if (newSelectedCell) {
        handleSelectedCell(newSelectedCell);
      }
    },
    [isTimerRunning, selectedCell, cells, handleSelectedCell]
  );

  const handleValueChange = useCallback(
    (value: string) => {
      if (!isTimerRunning) {
        setIsTimerRunning(true);
        return;
      }
      const newCells = [...cells];

      addToHistory();

      if (!selectedCell.isEditable) {
        return;
      }

      if (!notesToggle) {
        selectedCell.noteValues.length = 0;

        if (selectedCell.value === "") {
          selectedCell.value = value;
          increaseInvalidCount(selectedCell, cells);
        } else if (selectedCell.value === value) {
          decreaseInvalidCount(selectedCell, cells);
          selectedCell.value = "";
        } else if (selectedCell.value !== value) {
          decreaseInvalidCount(selectedCell, cells);
          selectedCell.value = value;
          increaseInvalidCount(selectedCell, cells);
        }
      } else {
        const notesIndex = Number(value) - 1;

        if (selectedCell.value !== "") {
          decreaseInvalidCount(selectedCell, cells);
          selectedCell.value = "";
        }

        if (selectedCell.noteValues[notesIndex] === value) {
          selectedCell.noteValues[notesIndex] = "";
        } else selectedCell.noteValues[notesIndex] = value;
      }

      highlightCells(selectedCell, newCells);
      setCells(newCells);
    },
    [addToHistory, cells, isTimerRunning, notesToggle, selectedCell]
  );

  const handleNotesDelete = useCallback(() => {
    if (selectedCell.noteValues.length > 0) {
      selectedCell.noteValues.length = 0;
    }
  }, [selectedCell.noteValues]);

  const handleDelete = useCallback(() => {
    if (!isTimerRunning) {
      setIsTimerRunning(true);
      return;
    }
    handleValueChange("");
    handleNotesDelete();
  }, [handleNotesDelete, handleValueChange, isTimerRunning]);

  const handleUndo = useCallback(() => {
    if (!isTimerRunning) {
      setIsTimerRunning(true);
      return;
    }
    const newCells = [...cells];
    const lastCell = history.pop();

    if (!lastCell) {
      return;
    }

    decreaseInvalidCount(newCells[lastCell.index], cells);
    newCells[lastCell.index].value = lastCell.value;
    newCells[lastCell.index].noteValues = lastCell.noteValues;

    if (lastCell.value) {
      increaseInvalidCount(newCells[lastCell.index], cells);
    }

    highlightCells(newCells[lastCell.index], newCells);
    setSelectedCell(newCells[lastCell.index]);
    setCells(newCells);
  }, [cells, history, isTimerRunning]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (/^[1-9]$/.test(event.key)) {
        handleValueChange(event.key);
      } else if (event.key === "Delete") {
        handleDelete();
      } else {
        handleArrowKeyPress(event.key);
      }
    },
    [handleArrowKeyPress, handleDelete, handleValueChange]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleNotesToggle = useCallback(() => {
    if (!isTimerRunning) {
      setIsTimerRunning(true);
      return;
    }
    setNotesToggle((notesToggle) => !notesToggle);
  }, [isTimerRunning]);

  return (
    <div className="sudoku-game">
      <div className="timer-game">
        <TimeControl
          onTimerToggle={timerToggle}
          timer={timer}
          isTimerRunning={isTimerRunning}
        />
        <GameBoard cells={isTimerRunning ? cells : dummyCells} 
        onSelectCell={handleSelectedCell} 
        backgroundClassName={getGameBoardClassName(isTimerRunning)}
        onPlayClick={timerToggle}/>
      </div>
      <ControlBoard
        onNewGameClick={handleNewGame}
        onNumberButtonClick={handleValueChange}
        onUndoClick={handleUndo}
        onDeleteClick={handleDelete}
        onNotesClick={handleNotesToggle}
        notesToggle={notesToggle}
      />
    </div>
  );
}
