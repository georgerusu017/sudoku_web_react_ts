import { Cell } from "../models/Cell.model";
import { findNeighbors } from "./findNeighbors";

export function highlightCells(selectedCell: Cell, cells: Cell[][]) {

    let neighborIds = findNeighbors(selectedCell)
    cells.flat().forEach(squareCell => {

        squareCell.isHighlighted = false

        // arr.includes()
        neighborIds.forEach((id, index) => {
            if (squareCell.id === id) {
                squareCell.isHighlighted = true
                neighborIds.splice(index, 1)
            }
        })

        if (squareCell.squareId === selectedCell.squareId) {
            squareCell.isHighlighted = true
        }

        squareCell.isSelected = squareCell.id === selectedCell.id

        // one liner
        if (squareCell.value !== '' && squareCell.value === selectedCell.value) {
            squareCell.isSibling = true;
        }
        else {
            squareCell.isSibling = false;
        }
    })
}