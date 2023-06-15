import React from 'react';
import TimeControl from '../components/TimeControl/TimeControl';
import GameBoard from '../components/GameBoard/GameBoard';
import ControlBoard from '../components/ControlBoard/ControlBoard';
import { getSudoku } from 'sudoku-gen';
import "../pages/SudokuGame.css"

export default function SudokuGame() {

   function resumeTimer() {
      console.log("test")
   }

   // function handleNumber(){
   //    console.log("Handle test")
   //    resumeTimer()
   // }

   const sudoku = getSudoku('expert');
   console.log("sudoku puzzle = ", sudoku.puzzle)
   // generare sudoku puzzle

   return (
      <div className="sudoku-game">
         <div className='timer-game'>
            <TimeControl onResume={resumeTimer} />
            <GameBoard />
         </div>
         <ControlBoard />
      </div>
   )
}

