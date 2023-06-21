import Square from "../Square/Square";
import "../GameBoard/GameBoard.css"
import { useCallback, useEffect, useState } from "react";
import { generateSudoku } from "../../services/sudoku.service";
import { Cell } from "../../models/Cell.model";
import { highlightCells } from "../../services/highlightCells";


export default function GameBoard() {

    const [cells, setCells] = useState<Cell[][]>(generateSudoku)
    const [selectedCell, setSelectedCell] = useState<Cell>(cells[0][0])

    // un useEffect pentru handleSelectCell cells[0][0]  
    // notita 1: ar fi bine sa fie cumva controlat apelat, si anume sa fie simulat click-ul, selectia celulei 0 0
    selectedCell.isSelected = true

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
                        id={`square-${index}`}
                        cells={squareCells}
                        onSelectCell={handleSelectedCell}
                    />
                ))
            }
        </div>
    )
}