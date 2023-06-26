import Square from "../Square/Square";
import "../GameBoard/GameBoard.css"
import { useCallback, useEffect, useMemo, useState } from "react";
import { generateSudoku } from "../../services/sudoku.service";
import { Cell } from "../../models/Cell.model";
import { highlightCells } from "../../services/highlightCells";
import { calculateSelectedCellNewPosition } from "../../services/calculateSelectedCellNewPosition";
type GameBoardProps = {
    trigger: number,
}


export default function GameBoard(trigger : GameBoardProps) {

    // transformat in cells, venit direct .flat din generateSudoku
    const [cells, setCells] = useState<Cell[]>(generateSudoku)
    const [selectedCell, setSelectedCell] = useState<Cell>(cells[0])

    useEffect(() => {

        if(trigger) {

            let newSudoku = generateSudoku()
            console.log(newSudoku);
            setCells([...newSudoku])
            // facut in alta parte, nu aici in useEffect. Pentru ca setSquares este asincron.
            handleSelectedCell(newSudoku[0])

        }

    }, [trigger])

    const handleSelectedCell = useCallback((cell: Cell) => {

        const newSquares = [...cells]

        highlightCells(cell, newSquares)
        setSelectedCell(cell)
        setCells(newSquares)

    }, [cells])

    const handleArrowKeyPress = useCallback((event: { key: string }) => {
        
        const newId = calculateSelectedCellNewPosition(selectedCell, event.key)
        const newSelectedCell = cells.find(cell => cell.id === newId)
        
        if (newSelectedCell) {
            handleSelectedCell(newSelectedCell)
        }

    }, [selectedCell, cells, handleSelectedCell])

    useEffect(() => {
        document.addEventListener("keydown", handleArrowKeyPress)


        return () => {
            document.removeEventListener("keydown", handleArrowKeyPress)
        }

    }, [handleArrowKeyPress])


    const squares:Cell[][] = []

    for(let i=0; i<9; i++){
        let square:Cell[] = []
        for(let j=0; j<9; j++){
            square.push(cells[(9*i + j)])
        }
        squares.push(square)
    }

    return (
        <div className="game-board">
            {
                
                squares.map((squareCells, index) => (
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