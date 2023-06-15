import Square from "../Square/Square";
import "../GameBoard/GameBoard.css"
import { useState } from "react";
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


    const squares = Array.from({ length: 9 }, (_, index) => index + 1)
    const sudokuPuzzle = getSudoku('easy').puzzle.split('');
    const sudokuThirds = []
    const squareValues = [];

    // const [cellValue, setValue] = useState();

    function splitArrayIntoThirds(array: string[]) {
        const third = Math.floor(array.length / 3);
        const firstThird = array.slice(0, third);
        const secondThird = array.slice(third, third * 2);
        const lastThird = array.slice(third * 2);

        return [firstThird, secondThird, lastThird];
    }

    function arrangeSquaresValues(array: string[]) {

        const sections = []
        for (let i = 0; i < 3; i++) {
            sections.push(splitArrayIntoThirds(array)[i])
        }

        const insideSections = []
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                insideSections.push(...splitArrayIntoThirds(sections[j])[i])
            }
        }

        return insideSections
    }

    for (let i = 0; i < 3; i++) {
        sudokuThirds.push(splitArrayIntoThirds(sudokuPuzzle)[i])
    }

    for (let i = 0; i < 3; i++) {
        squareValues.push(...splitArrayIntoThirds(arrangeSquaresValues(sudokuThirds[i])))
    }

    console.log("sudoku-gird = ", sudokuPuzzle)
    console.log("square values = ", squareValues)

    return (
        <div className="game-board">
            {squares.map((number) => (
                <Square key={`cell-${number}`} id={`cell-${number}`} squareValues="" />
            ))}
        </div>
    )
}