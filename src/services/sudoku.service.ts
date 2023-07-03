import { getSudoku } from "sudoku-gen";
import { Cell } from "../models/Cell.model";

function splitArrayIntoThirds(array: Cell[]) {
    const third = Math.floor(array.length / 3);
    const firstThird = array.slice(0, third);
    const secondThird = array.slice(third, third * 2);
    const lastThird = array.slice(third * 2);

    return [firstThird, secondThird, lastThird];
}

function groupInto3Squares(array: Cell[], squareLine: number): [Cell[], Cell[], Cell[]] {

    const threeGridLines = splitArrayIntoThirds(array)
    const threeSquares: [Cell[], Cell[], Cell[]] = [[], [], []];

    for (let i = 0; i < 3; i++) {
        const lineSections = splitArrayIntoThirds(threeGridLines[i])
        for (let j = 0; j < 3; j++) {
            threeSquares[j].push(...lineSections[j])
            lineSections[j][0].squareId = 3*squareLine + j;
            lineSections[j][1].squareId = 3*squareLine + j;
            lineSections[j][2].squareId = 3*squareLine + j;
        }
    }

    return threeSquares
}

function arrangeCellsIntoSquares(puzzle: Cell[]): Cell[][] {

    const sudokuThirds = splitArrayIntoThirds(puzzle);
    const squareValues = [];

    for (let i = 0; i < 3; i++) {
        squareValues.push(...groupInto3Squares(sudokuThirds[i],i))
    }

    return squareValues
}

export function generateSudoku(): Cell[] {

    const sudokuPuzzle = getSudoku('hard').puzzle
        .split('')
        .map<Cell>((element, index) => ({
            value: element === '-' ? '' : element,
            isNote: false,
            noteValues: [],
            id: index,
            squareId: 99,
            validationCount: 0,
            isEditable: element === '-',
            isSelected: false,
            isHighlighted: false,
            isSibling: false,
        }));

    const squareValues = arrangeCellsIntoSquares(sudokuPuzzle).flat();

    return squareValues
}
