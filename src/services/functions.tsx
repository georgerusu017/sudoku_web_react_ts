

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

export function createSquareValuesFromPuzzle(puzzle : string[]) {

    const sudokuThirds = [];
    const squareValues = [];

    for (let i = 0; i < 3; i++) {
        sudokuThirds.push(splitArrayIntoThirds(puzzle)[i])
    }

    for (let i = 0; i < 3; i++) {
        squareValues.push(...splitArrayIntoThirds(arrangeSquaresValues(sudokuThirds[i])))
    }

    return squareValues
}