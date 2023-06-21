import Square from "../Square/Square";
import "../GameBoard/GameBoard.css"
import { useCallback, useEffect, useState } from "react";
import { generateSudoku } from "../../services/sudoku.service";
import { Cell } from "../../models/Cell.model";
import { highlightCells } from "../../services/highlightCells";


export default function GameBoard() {

    const [cells, setCells] = useState<Cell[][]>(generateSudoku)
    const [selectedCell, setSelectedCell] = useState<Cell>(cells[0][0])

    useEffect(() => {

        handleSelectedCell(cells[0][0])
        // fara dependita sa ruleze o data.
    },[])

    //aici un alt useEffect cu addEventListener + return removeEventListener pentru ArrowKeys.

    const handleSelectedCell = useCallback((cell: Cell) => {
        
        highlightCells(cell,cells)
        setSelectedCell(cell)
        setCells([...cells])

    }, [cells])

    return (
        <div className="game-board">
            {
                cells.map((squareCells, index) => (
                    <Square
                        key={`square-${index}`}
                        cells={squareCells}
                        onSelectCell={handleSelectedCell}
                    />
                ))
            }
        </div>
    )
}