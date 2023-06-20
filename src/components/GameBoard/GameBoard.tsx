import Square from "../Square/Square";
import "../GameBoard/GameBoard.css"
import { useCallback, useEffect, useState } from "react";
import { generateSudoku } from "../../services/sudoku.service";
import { Cell } from "../../models/Cell.model";
import { findNeighbors } from "../../services/findNeighbors";


export default function GameBoard() {

    //                    aici squares.flat(), much better with useMemo
    const [cells, setCells] = useState<Cell[][]>(generateSudoku)

    // obiect cu key id much better with useMemo
    const [selectedCell, setSelectedCell] = useState<Cell>(cells[0][0])

    // un useEffect pentru handleSelectCell cells[0][0]  
    // notita 1: ar fi bine sa fie cumva controlat apelat, si anume sa fie simulat click-ul, selectia celulei 0 0
    selectedCell.isSelected = true

    const handleSelectCell = useCallback((cell: Cell) => {
        let neighbors = findNeighbors(cell)

        cells.flat().forEach(squareCell => {
            if (squareCell.id === cell.id) {
                squareCell.isSelected = true
            }
            else {
                squareCell.isSelected = false
            }
            
            if (squareCell.value !== '' && squareCell.value === cell.value) {
                squareCell.isSibling = true;
            }
            else {
                squareCell.isSibling = false;
            }
        })

        neighbors.forEach(id => {
            // squareId din cell, foloseste-l 
            // notita 2: in cell avem si square id pe care nu stiu daca il folosesc??
        })

        console.
        log(cell)
        
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
                        onSelectCell={handleSelectCell}
                    />
                ))
            }
        </div>
    )
}