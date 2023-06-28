import { Cell } from "../models/Cell.model";
import { findNeighbors } from "./findNeighbors";

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