import Square from "../Square/Square";
import "../GameBoard/GameBoard.css"
import { useCallback, useEffect, useState } from "react";
import { generateSudoku } from "../../services/sudoku.service";
import { Cell } from "../../models/Cell.model";
import { highlightCells } from "../../services/highlightCells";
import { calculateSelectedCellNewPosition } from "../../services/calculateSelectedCellNewPosition";


export default function GameBoard() {

    const [cells, setCells] = useState<Cell[][]>(generateSudoku)
    const [selectedCell, setSelectedCell] = useState<Cell>(cells[0][0])

    useEffect(() => {

        handleSelectedCell(cells[0][0])

    }, [])

    //aici un alt useEffect cu addEventListener + return removeEventListener pentru ArrowKeys.

    const handleArrowKeyPress = useCallback((event: { key: string }) => {

        console.log("Selected cell = ", selectedCell);
        
        const newId = calculateSelectedCellNewPosition(selectedCell, event.key)
        const newSelectedCell = cells.flat().find(cell => cell.id === newId)

        console.log("new Selected Cell = ", newSelectedCell);
        
        // setSelectedCell(newSelectedCell)

    }, [])

    useEffect(() => {
        document.addEventListener("keydown", handleArrowKeyPress)

        return () => {
            document.removeEventListener("keydown", handleArrowKeyPress)
        }

    }, [handleArrowKeyPress])

    const handleSelectedCell = useCallback((cell: Cell) => {

        highlightCells(cell, cells)
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