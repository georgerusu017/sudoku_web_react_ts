import Square from "../Square/Square";
import "../GameBoard/GameBoard.css"
import { useCallback, useState } from "react";
import { generateSudoku } from "../../services/sudoku.service";
import { CellModel } from "../../models/Cell.model";


export default function GameBoard() {

    const squares = generateSudoku()

    const onSelectCell = useCallback((cell: CellModel) => {
        console.log("in gameBoard", cell.id);
    }, [])

    return (
        <div className="game-board">
            {
                squares.map((squareCells, index) => (
                    <Square
                        key={`square-${index}`}
                        id={`square-${index}`}
                        cells={squareCells}
                        onSelectCell={onSelectCell}
                    />
                ))
            }
        </div>
    )
}