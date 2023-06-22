import { Cell } from "../models/Cell.model";
import { findLineNeighbors } from "./findNeighbors";

// const pentru Arrow aici cu enum (ts enum for hint)


export function calculateSelectedCellNewPosition(cell: Cell, event: string) {

    const neighbors:number[] = findLineNeighbors(cell.id);

    let cellId = cell.id;

    if (event === 'ArrowLeft') {
        if (cellId - 1 < neighbors[0]) {
            cellId += 8
        }
        else {
            cellId--;
        }
    }

    if (event === 'ArrowRight') {
        if (cellId + 1 > neighbors[7]) {
            cellId -= 8
        }
        else {
            cellId++;
        }
    }

    if (event === 'ArrowUp') {

        cellId -= 9;
        if (cellId < 0) {
            cellId += 81;
        }
    }

    if (event === 'ArrowDown') {

        cellId += 9;
        if (cellId > 80) {
            cellId -= 81;
        }
    }

    return cellId
}