import Square from "../Square/Square";
import "../GameBoard/GameBoard.css"
import { createSquareValuesFromPuzzle } from "../../services/functions";
import { useCallback, useState } from "react";
import { getSudoku } from 'sudoku-gen';



export default function GameBoard() {

    const squares = Array.from({ length: 9 }, (_, index) => index + 1)
    const sudokuPuzzle = getSudoku('easy').puzzle.split('');
    const squareValues = [];

    squareValues.push(...createSquareValuesFromPuzzle(sudokuPuzzle))

    console.log("sudoku-gird = ", sudokuPuzzle)
    console.log("square values = ", squareValues)

    const handleSelectedCell = useCallback((id:string) => {
        console.log("in gameboard",id);
    },[])

    return (
        <div className="game-board">
            {squares.map((number) => (
                <Square key={`cell-${number}`} id={`cell-${number}`} squareValues="" setSelectedCell={handleSelectedCell}/>
            ))}
        </div>
    )
}