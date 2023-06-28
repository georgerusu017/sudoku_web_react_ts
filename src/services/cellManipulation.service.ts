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

export function increaseInvalidCount(selectedCell: Cell, cells: Cell[], value: string){

    let neighborIds = findNeighbors(selectedCell, cells)

    cells.forEach(cell => {

        if(neighborIds.includes(cell.id)){
            if(cell.value === selectedCell.value){
                cell.validationIndex++
                selectedCell.validationIndex++
            }
        }

    })
}

export function decreaseInvalidCount(selectedCell: Cell, cells: Cell[], value: string){

    let neighborIds = findNeighbors(selectedCell, cells)

    cells.forEach(cell => {

        if(neighborIds.includes(cell.id)){
            if(cell.value === selectedCell.value){
                cell.validationIndex--
                selectedCell.validationIndex--
            }
        }

    })
}

export function getClassName(cell:Cell){
    let className = 'cell'
    if(cell.isSelected) {
        className += ' highlightSelected'
    }
    
    if(cell.isSibling) {
        className += ' highlightSibling'
    }

    if(cell.isHighlighted) {
        className += ' highlight'
    }

    if(cell.validationIndex > 0){
        className += ' highlightInvalid'
    }

    if(cell.isEditable){
        className += ' isEditable'
    }
    return className
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

export function selectCell(cell:Cell) {
    cell.isSelected = true;
}

export function findLineNeighbors(id: number) {

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

    output = neighbors.filter(item => item !== id)
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

    output = neighbors.filter(item => item !== id)

    return output;
}

export function findNeighbors(cell: Cell, cells: Cell[]) {

    let neighbors = []

    neighbors.push(...findColumnNeighbors(cell.id))
    neighbors.push(...findLineNeighbors(cell.id))

    cells.forEach(squareCell => {
        if (squareCell.squareId === cell.squareId) {
            neighbors.push(squareCell.id)
        }
    })

    const uniqueNeighbors = Array
        .from(new Set(neighbors))
        .filter(item => item !== cell.id)
    ;

    return uniqueNeighbors
}