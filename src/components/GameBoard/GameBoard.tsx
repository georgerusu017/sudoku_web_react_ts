import Square from "../Square/Square";
import "../GameBoard/GameBoard.css"
import { getSudoku } from 'sudoku-gen';


export default function GameBoard() {

    // function createSudokuGrid(empty = '', hidden = '') {

    //     function createSquareLine(squareId, i, k) {
    //         for (let j = 0; j < 3; j++) {
    //             const pointer = (9 * k) + (3 * i) + j;
    //             const cell = addDiv(state.cells[pointer].idText + empty, squareId, CELL_CSS.class);
    //             state.cells[pointer].html = cell;
    //         }
    //     }
    
    //     for (let i = 0; i < 9; i++) {
    //         const squareId = "Square-" + (i) + empty;
    //         addDiv(squareId, LAYOUT_ID.table, `Square` + hidden)
    
    //         if (i < 3) {
    //             for (let k = 0; k <= 2; k++) {
    //                 createSquareLine(squareId, i, k);
    //             }
    //         } else if (i < 6) {
    //             for (let k = 2; k <= 4; k++) {
    //                 createSquareLine(squareId, i, k);
    //             }
    //         } else if (i < 9) {
    //             for (let k = 4; k <= 6; k++) {
    //                 createSquareLine(squareId, i, k);
    //             }
    //         }
    //     }
    
    // }

    const sudoku = getSudoku('expert');
    console.log("sudoku puzzle = ", sudoku.puzzle)
    const elements = [];

    for (let i = 1; i < 10; i++) {
        elements.push(<Square key={`square-key-${i}`} id={`square-${i}`}></Square>)
    }

    return (
        <div className="game-board">
            {elements}
        </div>
    )
    
}