import React, { useCallback, useState } from 'react';
import TimeControl from '../components/TimeControl/TimeControl';
import GameBoard from '../components/GameBoard/GameBoard';
import ControlBoard from '../components/ControlBoard/ControlBoard';
import "../pages/SudokuGame.css"

export default function SudokuGame() {

   const[trigger, setTrigger] = useState(0)

   function resumeTimer() {
      console.log("test")
   }

   const handleNewGame = useCallback(() => {

      setTrigger((trigger) => trigger + 1)

   }, [])

   // aici mutam generarea de sudoku din GameBoard

   return (
      <div className="sudoku-game">
         <div className='timer-game'>
            <TimeControl onResume={resumeTimer} />
            <GameBoard trigger={trigger} />
         </div>
         <ControlBoard onNewGameClick={handleNewGame} />
      </div>
   )
}

