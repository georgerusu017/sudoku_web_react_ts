import { Cell } from "../models/Cell.model";
import { findNeighbors } from "./findNeighbors";

export function highlightCells(selectedCell: Cell, cells: Cell[]) {

    let neighborIds = findNeighbors(selectedCell)

    cells.forEach(squareCell => {

        const isSameLineOrColumn = neighborIds.includes(squareCell.id);
        const isSameSquare = squareCell.squareId === selectedCell.squareId;
        squareCell.isHighlighted = isSameLineOrColumn || isSameSquare;

        squareCell.isSelected = squareCell.id === selectedCell.id

        const isNotEmpty = squareCell.value !== '';
        const isSameValue = squareCell.value === selectedCell.value;
        squareCell.isSibling = isNotEmpty && isSameValue;
    })
}