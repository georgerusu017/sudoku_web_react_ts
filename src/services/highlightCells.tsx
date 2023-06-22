import { Cell } from "../models/Cell.model";
import { findNeighbors } from "./findNeighbors";

export function highlightCells(selectedCell: Cell, cells: Cell[][]) {

    let neighborIds = findNeighbors(selectedCell)

    cells.flat().forEach(squareCell => {

        squareCell.isHighlighted = false

        squareCell.isHighlighted = neighborIds.includes(squareCell.id)

        if (squareCell.squareId === selectedCell.squareId) {
            squareCell.isHighlighted = true
        }

        squareCell.isSelected = squareCell.id === selectedCell.id

        squareCell.isSibling = squareCell.value !== '' && squareCell.value === selectedCell.value
    
    })
}