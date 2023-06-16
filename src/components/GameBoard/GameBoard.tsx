import Square from "../Square/Square";
import "../GameBoard/GameBoard.css"
import { arrangePuzzleContentForSquares } from "../../services/functions.service";
import { useCallback, useState } from "react";
import { getSudoku } from 'sudoku-gen';


export default function GameBoard() {

    const sudokuPuzzle = getSudoku('easy').puzzle.split('').map(element => element === '-' ? '' : element);
    const sudokuValuesId = sudokuPuzzle.map((element, index) => index.toString());

    const squareValues = [...arrangePuzzleContentForSquares(sudokuPuzzle)];
    const sudokuIdsArranged = [...arrangePuzzleContentForSquares(sudokuValuesId)]

    const onSelectCell = useCallback((id: string) => {
        console.log("in gameBoard", id);
    }, [])

    return (
        <div className="game-board">
            {
                squareValues.map((value, index) => (
                    <Square
                        key={`square-${index}`}
                        id={`square-${index}`}
                        squareValues={value}
                        cellIds={sudokuIdsArranged[index]}
                        onSelectCell={onSelectCell}
                    />
                ))
            }
        </div>
    )
}