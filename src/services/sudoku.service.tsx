import { getSudoku } from "sudoku-gen";
import { CellModel } from "../models/Cell.model";

function splitArrayIntoThirds(array: CellModel[]) {
    const third = Math.floor(array.length / 3);
    const firstThird = array.slice(0, third);
    const secondThird = array.slice(third, third * 2);
    const lastThird = array.slice(third * 2);

    return [firstThird, secondThird, lastThird];
}

function groupInto3Squares(array: CellModel[]): [CellModel[], CellModel[], CellModel[]] {

    const threeGridLines = splitArrayIntoThirds(array)
    const threeSquares: [CellModel[], CellModel[], CellModel[]] = [[], [], []];

    for (let i = 0; i < 3; i++) {
        const lineSections = splitArrayIntoThirds(threeGridLines[i])
        for (let j = 0; j < 3; j++) {
            threeSquares[j].push(...lineSections[j])
        }
    }

    return threeSquares
}

function arrangeCellsIntoSquares(puzzle: CellModel[]): CellModel[][] {

    const sudokuThirds = splitArrayIntoThirds(puzzle);
    const squareValues = [];

    for (let i = 0; i < 3; i++) {
        squareValues.push(...groupInto3Squares(sudokuThirds[i]))
    }

    return squareValues
}

export function generateSudoku(): CellModel[][] {

    const sudokuPuzzle = getSudoku('easy').puzzle
        .split('')
        .map<CellModel>((element, index) => ({
            value: element === '-' ? '' : element,
            id: index.toString(),
            squareId: '',
            isSelected: false,
            isHighlighted: false,
            isSibling: false,
        }));

    const squareValues = arrangeCellsIntoSquares(sudokuPuzzle);

    return squareValues
}
