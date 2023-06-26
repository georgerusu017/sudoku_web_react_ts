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

      const newSquares = cells

      highlightCells(cell, newSquares)
      setSelectedCell(cell)

   }, [cells])

   const handleArrowKeyPress = useCallback((event: { key: string }) => {

      const newId = calculateSelectedCellNewPosition(selectedCell, event.key)
      const newSelectedCell = cells.find(cell => cell.id === newId)

      if (newSelectedCell) {
         handleSelectedCell(newSelectedCell)
      }

   }, [selectedCell, cells, handleSelectedCell])

   const handleValueChange = useCallback((event: {key: string}) => {

      updateCellValue(selectedCell,event.key)

   },[])

   useEffect(() => {
      document.addEventListener("keydown", handleArrowKeyPress)


      return () => {
         document.removeEventListener("keydown", handleArrowKeyPress)
      }

   }, [handleArrowKeyPress])



   return (
      <div className="sudoku-game">
         <div className='timer-game'>
            <TimeControl onResume={resumeTimer} />
            <GameBoard
               cells={cells}
               onSelectCell={handleSelectedCell} />
         </div>
         <ControlBoard onNewGameClick={handleNewGame} onNumberButtonClick={handleValueChange} />
      </div>
   )
}

