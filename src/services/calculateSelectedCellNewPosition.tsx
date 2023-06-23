import { Cell } from "../models/Cell.model";
import { findLineNeighbors } from "./findNeighbors";

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