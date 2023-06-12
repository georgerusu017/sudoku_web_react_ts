import React from 'react';
import TimeControl from '../components/TimeControl/TimeControl';
import GameBoard from '../components/GameBoard/GameBoard';
import ControlBoard from '../components/ControlBoard/ControlBoard';

export default function SudokuGame() {
   
   function resumeTimer(){
      console.log("test")
   }

   // function handleNumber(){
   //    console.log("Handle test")
   //    resumeTimer()
   // }

   return(
      <div className="sudoku-game">
         <TimeControl onResume={resumeTimer}/> 
         <GameBoard/>
         <ControlBoard/>
      </div>
   )
}
