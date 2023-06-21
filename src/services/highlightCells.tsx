import { Cell } from "../models/Cell.model";
import { findNeighbors } from "./findNeighbors";

export function highlightCells(selectedCell:Cell, cells:Cell[][]){

    let neighbors = findNeighbors(selectedCell)
    cells.flat().forEach(squareCell => {

            squareCell.isHighlighted = false

            if (neighbors.length > 0) {
                neighbors.forEach((id, index) => {
                    if (squareCell.id === id) {
                        squareCell.isHighlighted = true
                        neighbors.splice(index, 1)
                    }
                })
            }

            if (squareCell.squareId === selectedCell.squareId) {
                squareCell.isHighlighted = true
            }

            if (squareCell.id === selectedCell.id) {
                squareCell.isSelected = true
            }
            else {
                squareCell.isSelected = false
            }

            if (squareCell.value !== '' && squareCell.value === selectedCell.value) {
                squareCell.isSibling = true;
            }
            else {
                squareCell.isSibling = false;
            }
        })
}