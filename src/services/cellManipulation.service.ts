import { Cell } from "../models/Cell.model";

enum Arrow {
    Left = `ArrowLeft`,
    Right = `ArrowRight`,
    Up = `ArrowUp`,
    Down = `ArrowDown`
}

export function calculateSelectedCellNewPosition(cell: Cell, event: string) {

    const neighbors:number[] = findLineNeighbors(cell.id);

    let cellId = cell.id;

    if (event === Arrow.Left) {
        if (cellId - 1 < neighbors[0]) {
            cellId += 8
        }
        else {
            cellId--;
        }
    }

    if (event === Arrow.Right) {
        if (cellId + 1 > neighbors[7]) {
            cellId -= 8
        }
        else {
            cellId++;
        }
    }

    if (event === Arrow.Up) {

        cellId -= 9;
        if (cellId < 0) {
            cellId += 81;
        }
    }

    if (event === Arrow.Down) {

        cellId += 9;
        if (cellId > 80) {
            cellId -= 81;
        }
    }

    return cellId
}

export function increaseInvalidCount(selectedCell: Cell, cells: Cell[]){

    let neighborIds = findNeighbors(selectedCell, cells)

    cells.forEach(cell => {

        if(neighborIds.includes(cell.id)){
            if(cell.value === selectedCell.value && cell.value !== ''){
                cell.validationIndex++
                selectedCell.validationIndex++
            }
        }

    })
}

export function decreaseInvalidCount(selectedCell: Cell, cells: Cell[]){

    let neighborIds = findNeighbors(selectedCell, cells)

    cells.forEach(cell => {

        if(neighborIds.includes(cell.id)){
            if(cell.value === selectedCell.value && cell.value !== ''){
                cell.validationIndex--
                selectedCell.validationIndex--
            }
        }

    })
}

export function getClassName(cell:Cell){

    const className: string[] = ['cell']

    cell.isSelected && className.push('highlightSelected')
    cell.isSibling && className.push('highlightSibling')
    cell.isHighlighted && className.push('highlight')
    cell.validationIndex && className.push('highlightInvalid')
    cell.isEditable && className.push('isEditable')

    const classNameUnited = className.join(' ')

    return classNameUnited
}

export function highlightCells(selectedCell: Cell, cells: Cell[]) {

    let neighborIds = findNeighbors(selectedCell, cells)

    cells.forEach(cell => {

        const isNeighbor = neighborIds.includes(cell.id);
        cell.isHighlighted = isNeighbor;

        cell.isSelected = cell.id === selectedCell.id

        const isNotEmpty = cell.value !== '';
        const isSameValue = cell.value === selectedCell.value;
        cell.isSibling = isNotEmpty && isSameValue;
    })
}

function findLineNeighbors(id: number) {

    let smallerNum = id;
    let largerNum = id;
    let output = [];
    if (id % 9 === 0) {
        largerNum++;
    }
    else {
        smallerNum--;
    }

    while (smallerNum % 9 !== 0) {
        smallerNum--;
    }

    while (largerNum % 9 !== 8) {
        largerNum++;
    }

    const neighbors = [];

    for (let i = smallerNum; i <= largerNum; i++) {
        neighbors.push(i);
    }

    output = neighbors.filter(neighborId => neighborId !== id)
    output.sort((a, b) => a - b);

    return output;
}

function findColumnNeighbors(id: number) {
    let smallerNum = id;
    let largerNum = id;
    let output = [];

    while (smallerNum - 9 >= 0) {
        smallerNum -= 9;
    }

    while (largerNum + 9 <= 80) {
        largerNum += 9;
    }

    const neighbors = [];

    for (let i = smallerNum; i <= largerNum; i += 9) {
        neighbors.push(i);
    }

    output = neighbors.filter(neighborId => neighborId !== id)

    return output;
}

function findNeighbors(cell: Cell, cells: Cell[]) {

    let neighbors: number[] = []

    // uniqueNeighbors primeste direct celula, si findNeighbors va intoarce celule direct

    neighbors.push(...findColumnNeighbors(cell.id))
    neighbors.push(...findLineNeighbors(cell.id))

    cells.forEach(squareCell => {
        if (squareCell.squareId === cell.squareId) {
            neighbors.push(squareCell.id)
        }
    })

    const uniqueNeighbors = Array
        .from(new Set(neighbors))
        .filter(neighborId => neighborId !== cell.id)
    ;

    return uniqueNeighbors
}