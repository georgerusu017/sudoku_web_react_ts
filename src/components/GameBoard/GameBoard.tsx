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
    const [squares, setSquares] = useState<Cell[][]>(generateSudoku)
    const [selectedCell, setSelectedCell] = useState<Cell>(squares[0][0])

    useEffect(() => {

        if(trigger) {

            let newSudoku = generateSudoku()
            console.log(newSudoku);
            setSquares([...newSudoku])
            // facut in alta parte, nu aici in useEffect. Pentru ca setSquares este asincron.
            handleSelectedCell(newSudoku[0][0])

        }

    }, [trigger])

    const handleSelectedCell = useCallback((cell: Cell) => {

        const newSquares = [...squares]

        highlightCells(cell, newSquares)
        setSelectedCell(cell)
        setSquares(newSquares)

    }, [squares])

    const handleArrowKeyPress = useCallback((event: { key: string }) => {
        
        const newId = calculateSelectedCellNewPosition(selectedCell, event.key)
        const newSelectedCell = squares.flat().find(cell => cell.id === newId)
        
        if (newSelectedCell) {
            handleSelectedCell(newSelectedCell)
        }

    }, [selectedCell, squares, handleSelectedCell])

    useEffect(() => {
        document.addEventListener("keydown", handleArrowKeyPress)


        return () => {
            document.removeEventListener("keydown", handleArrowKeyPress)
        }

    }, [handleArrowKeyPress])

    return (
        <div className="game-board">
            {
                //aici facem for 1-9 1-9 pentru distribuire din cells care va fi doar un array
                // saaau doar un for aici si un for in cells

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