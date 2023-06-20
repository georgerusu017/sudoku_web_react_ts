import Square from "../Square/Square";
import "../GameBoard/GameBoard.css"
import { useCallback, useState } from "react";
import { generateSudoku } from "../../services/sudoku.service";
import { CellModel } from "../../models/Cell.model";
import { selectCell } from "../../services/selectCell";
import { findNeighbors } from "../../services/findNeighbors";


export default function GameBoard() {

    const squares = generateSudoku()
    const [cells, setCells] = useState<CellModel[][]>(squares)

    const initialCells = cells[0][0];
    const [selectedCell, setSelectedCell] = useState<CellModel>(initialCells)

    const onSelectCell = useCallback((cell: CellModel) => {
        let neighbors = findNeighbors(cell)

        cells.flat().forEach(squareCell => {
            if (squareCell.id === cell.id) {
                squareCell.isSelected = true
                setSelectedCell(squareCell)
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
            //
        })
        
        setCells([...cells])

    }, [cells])

    console.log(cells)

    return (
        <div className="game-board">
            {
                cells.map((squareCells, index) => (
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