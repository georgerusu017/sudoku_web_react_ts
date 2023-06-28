import React, { useCallback, useEffect, useState } from 'react';
import TimeControl from '../components/TimeControl/TimeControl';
import GameBoard from '../components/GameBoard/GameBoard';
import ControlBoard from '../components/ControlBoard/ControlBoard';
import "../pages/SudokuGame.css"
import { Cell } from '../models/Cell.model';
import { generateSudoku } from '../services/sudoku.service';
import { calculateSelectedCellNewPosition, decreaseInvalidCount, highlightCells, increaseInvalidCount } from '../services/cellManipulation.service';

export default function SudokuGame() {

   const [cells, setCells] = useState<Cell[]>(generateSudoku)
   const [selectedCell, setSelectedCell] = useState<Cell>(cells[0])

   function resumeTimer() {
      console.log("test")
   }

   const handleSelectedCell = useCallback((cell: Cell) => {

      const newCells = [...cells]

      highlightCells(cell, newCells)
      setSelectedCell(cell)
      setCells(newCells)

   }, [cells])

   const handleNewGame = useCallback(() => {
      const newCells = generateSudoku()
      highlightCells(newCells[0], newCells)

      setCells(newCells)
      setSelectedCell(newCells[0])
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

      if (!selectedCell.isEditable) {
         return
      }

      if (selectedCell.value === '') {

         selectedCell.value = value;
         increaseInvalidCount(selectedCell, cells, value)

      }
      else if (selectedCell.value === value) {

         decreaseInvalidCount(selectedCell, cells, value)
         selectedCell.value = '';

      }
      else if (selectedCell.value !== value) {

         decreaseInvalidCount(selectedCell, cells, value)
         selectedCell.value = value;
         increaseInvalidCount(selectedCell, cells, value)
         
      }

      highlightCells(selectedCell, newCells)
      setCells(newCells)

   }, [cells, selectedCell])

   const handleKeyDown = useCallback((event: KeyboardEvent) => {

      if (/^[1-9]$/.test(event.key)) {
         handleValueChange(event.key)

      } 
      else if(event.key === `Delete`){
         handleValueChange(``)
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
            onNumberButtonClick={handleValueChange}
            onDeleteClick={handleValueChange}
         />
      </div>
   )
}

