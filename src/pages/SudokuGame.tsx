import React from 'react';
import TimeControl from '../components/TimeControl/TimeControl';
import GameBoard from '../components/GameBoard/GameBoard';
import ControlBoard from '../components/ControlBoard/ControlBoard';
import "../pages/SudokuGame.css"

export default function SudokuGame() {

   function resumeTimer() {
      console.log("test")
   }

   return (
      <div className="sudoku-game">
         <div className='timer-game'>
            <TimeControl onResume={resumeTimer} />
            <GameBoard/>
         </div>
         <ControlBoard />
      </div>
   )
}

