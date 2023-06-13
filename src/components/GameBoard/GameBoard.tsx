import Square from "../Square/Square";
import "../GameBoard/GameBoard.css"


export default function GameBoard() {

    // function createSudokuGrid() {

    //     function createSquareLine(squareId, i, k) {
    //         for (let j = 0; j < 3; j++) {
    //             const pointer = (9 * k) + (3 * i) + j;
    //             const cell = ``
    //         }
    //     }

    //     for (let i = 0; i < 9; i++) {
    //         const squareId = "Square-" + (i);
    //         // addDiv(squareId, LAYOUT_ID.table, `Square` + hidden)

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

    const elements = [];

    for (let i = 0; i < 9; i++) {
        elements.push(<Square></Square>)
    }

    return (
        <div className="game-board">
            {elements}
        </div>
    )
}