import { Cell } from "../models/Cell.model";
import { findNeighbors } from "./findNeighbors";

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