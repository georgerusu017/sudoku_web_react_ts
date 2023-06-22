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

    const handleSelectedCell = useCallback((cell: Cell) => {

        const newCells = [...cells]

        highlightCells(cell, newCells)
        setSelectedCell(cell)
        setCells(newCells)

    }, [cells])

    const handleArrowKeyPress = useCallback((event: { key: string }) => {
        
        const newId = calculateSelectedCellNewPosition(selectedCell, event.key)
        const newSelectedCell = cells.flat().find(cell => cell.id === newId)
        
        if (newSelectedCell) {
            handleSelectedCell(newSelectedCell)
        }

    }, [cells, handleSelectedCell, selectedCell])

    useEffect(() => {
        document.addEventListener("keydown", handleArrowKeyPress)

        return () => {
            document.removeEventListener("keydown", handleArrowKeyPress)
        }

    }, [handleArrowKeyPress])

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