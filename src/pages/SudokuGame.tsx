import React, { useCallback, useEffect, useState } from 'react';
import TimeControl from '../components/TimeControl/TimeControl';
import GameBoard from '../components/GameBoard/GameBoard';
import ControlBoard from '../components/ControlBoard/ControlBoard';
import "../pages/SudokuGame.css"
import { Cell } from '../models/Cell.model';
import { generateSudoku } from '../services/sudoku.service';
import { highlightCells } from '../services/highlightCells';
import { calculateSelectedCellNewPosition } from '../services/calculateSelectedCellNewPosition';
import { updateCellValue } from '../services/updateCellValue';

export default function SudokuGame() {

   const [cells, setCells] = useState<Cell[]>(generateSudoku)
   const [selectedCell, setSelectedCell] = useState<Cell>(cells[0])

   function resumeTimer() {
      console.log("test")
   }

   const handleNewGame = useCallback(() => {

   }, [])

   const handleSelectedCell = useCallback((cell: Cell) => {

      const newCells = [...cells]

      highlightCells(cell, newCells)
      setSelectedCell(cell)
      setCells(newCells)

   }, [cells])

   const handleArrowKeyPress = useCallback((key: string) => {

      const newId = calculateSelectedCellNewPosition(selectedCell, key)
      const newSelectedCell = cells.find(cell => cell.id === newId)

      if (newSelectedCell) {
         handleSelectedCell(newSelectedCell)
      }

   }, [selectedCell, cells, handleSelectedCell])

   const handleValueChange = useCallback((value: string) => {

      const newCells = [...cells];

      if (!selectedCell.isEditable) {
         return
      }

      if (selectedCell.value === value) {
         selectedCell.value = '';
      }
      else {
         selectedCell.value = value;
      }

      highlightCells(selectedCell, newCells)
      setCells(newCells)

   }, [cells, selectedCell])

   const handleKeyDown = useCallback((event: KeyboardEvent) => {

      // de rezolvat cu NEW GAME si BUTOANELE 1-9
      if (/^[1-9]$/.test(event.key)) {
         handleValueChange(event.key)

      } else {
         handleArrowKeyPress(event.key)
      }

   }, [handleArrowKeyPress, handleValueChange])


   useEffect(() => {
      document.addEventListener("keydown", handleKeyDown)

      return () => {
         document.removeEventListener("keydown", handleKeyDown)
      }

   }, [handleKeyDown])


   return (
      <div className="sudoku-game">
         <div className='timer-game'>
            <TimeControl onResume={resumeTimer} />
            <GameBoard
               cells={cells}
               onSelectCell={handleSelectedCell} />
         </div>
         <ControlBoard
            onNewGameClick={handleNewGame}
         // onNumberButtonClick={handleValueChange}
         />
      </div>
   )
}

