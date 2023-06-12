import React from 'react';
import TimeControl from '../components/TimeControl';

export default function SudokuGame() {
   
   function resumeTimer(){
      console.log("test")
   }

   function handleNumber(){
      console.log("Handle test")
      resumeTimer()
   }

   return(
      <div className="sudoku-game">
         <TimeControl onResume={resumeTimer}/> 
         <button onClick={handleNumber}>1</button>
      </div>
   )
}
