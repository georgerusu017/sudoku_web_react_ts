import React, { useCallback, useEffect, useState } from 'react';
import TimeControl from '../components/TimeControl/TimeControlFirstTry';
import GameBoard from '../components/GameBoard/GameBoard';
import ControlBoard from '../components/ControlBoard/ControlBoard';
import "../pages/SudokuGame.css"
import { Cell } from '../models/Cell.model';
import { generateSudoku } from '../services/sudoku.service';
import { calculateSelectedCellNewPosition, decreaseInvalidCount, highlightCells, increaseInvalidCount } from '../services/cellManipulation.service';
import { CellHistory } from '../models/History.model';

export default function SudokuGame() {

   const [cells, setCells] = useState<Cell[]>(generateSudoku)
   const [selectedCell, setSelectedCell] = useState<Cell>(cells[0])
   const [notesToggle, setNotesToggle] = useState<boolean>(false)
   const [history, setHistory] = useState<CellHistory[]>([])

   function resumeTimer() {
      console.log("test")
   }

   const addToHistory = useCallback(() => {
      const cellDataToHistory = {
         value: selectedCell.value, noteValues: [...selectedCell.noteValues], index: cells.indexOf(selectedCell)
      }
      const newHistory = [...history, cellDataToHistory]
      setHistory(newHistory)
   },[cells, history, selectedCell])      

   const handleSelectedCell = useCallback((cell: Cell) => {

      const newCells = [...cells]

      highlightCells(cell, newCells)
      setSelectedCell(cell)
      setCells(newCells)

   }, [cells])

   const handleNewGame = useCallback(() => {
      const newCells = generateSudoku()
      highlightCells(newCells[0], newCells);
      setNotesToggle(false);

      setCells(newCells);
      setSelectedCell(newCells[0]);
   }, [])

   useEffect(() => {
      handleSelectedCell(cells[0])
   }, [])

   const handleArrowKeyPress = useCallback((key: string) => {

      const newId = calculateSelectedCellNewPosition(selectedCell, key)
      const newSelectedCell = cells.find(cell => cell.id === newId)

      if (newSelectedCell) {
         handleSelectedCell(newSelectedCell)
      }

   }, [selectedCell, cells, handleSelectedCell])

   const handleValueChange = useCallback((value: string) => {

      const newCells = [...cells];

      addToHistory()

      if (!selectedCell.isEditable) {
         return
      }

      if (!notesToggle) {

         selectedCell.noteValues.length = 0;

         if (selectedCell.value === '') {

            selectedCell.value = value;
            increaseInvalidCount(selectedCell, cells)

         }
         else if (selectedCell.value === value) {

            decreaseInvalidCount(selectedCell, cells)
            selectedCell.value = '';

         }
         else if (selectedCell.value !== value) {

            decreaseInvalidCount(selectedCell, cells)
            selectedCell.value = value;
            increaseInvalidCount(selectedCell, cells)

         }
      }

      else {

         const notesIndex = Number(value) - 1;

         if (selectedCell.value !== '') {

            decreaseInvalidCount(selectedCell, cells)
            selectedCell.value = '';

         }

         if (selectedCell.noteValues[notesIndex] === value) {
            selectedCell.noteValues[notesIndex] = '';
         }
         else selectedCell.noteValues[notesIndex] = value;


      }

      highlightCells(selectedCell, newCells)
      setCells(newCells)

   }, [addToHistory, cells, notesToggle, selectedCell])

   const handleNotesDelete = useCallback(() => {

      if (selectedCell.noteValues.length > 0) {
         selectedCell.noteValues.length = 0;
      }

   }, [selectedCell.noteValues])

   const handleDelete = useCallback(() => {

      addToHistory()
      handleValueChange('')
      handleNotesDelete()

   }, [addToHistory, handleNotesDelete, handleValueChange])

   const handleUndo = useCallback(() => {

      const newCells = [...cells]
      const lastCell = history.pop()

      if (lastCell) {

         decreaseInvalidCount(newCells[lastCell.index], cells)
         newCells[lastCell.index].value = '';
         setCells(newCells)
         
         handleNotesDelete()

         if (lastCell.value) {
            newCells[lastCell.index].value = lastCell.value
            increaseInvalidCount(newCells[lastCell.index], cells)
         }

         else {
            newCells[lastCell.index].noteValues = lastCell.noteValues
         }

         setSelectedCell(newCells[lastCell.index])
         setCells(newCells)

      }

      console.log('hit');

   }, [cells, handleNotesDelete, history])

   const handleKeyDown = useCallback((event: KeyboardEvent) => {

      if (/^[1-9]$/.test(event.key)) {
         handleValueChange(event.key)
      }
      else if (event.key === 'Delete') {
         handleDelete()
      } else {
         handleArrowKeyPress(event.key)
      }

   }, [handleArrowKeyPress, handleDelete, handleValueChange])

   useEffect(() => {
      document.addEventListener("keydown", handleKeyDown)

      return () => {
         document.removeEventListener("keydown", handleKeyDown)
      }

   }, [handleKeyDown])

   const handleNotesToggle = useCallback(() => {

      setNotesToggle((notesToggle) => !notesToggle)
      console.log(notesToggle);

   }, [notesToggle])

   return (
      <div className="sudoku-game">
         <div className="timer-game">
            <TimeControl onResume={resumeTimer} />
            <GameBoard
               cells={cells}
               onSelectCell={handleSelectedCell} />
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
   )
}

