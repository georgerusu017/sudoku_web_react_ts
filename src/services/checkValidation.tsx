import { Cell } from "../models/Cell.model";
import { findNeighbors } from "./findNeighbors";

export function checkValidation(selectedCell: Cell, cells: Cell[], value:string){

    let neighborIds = findNeighbors(selectedCell)

    cells.forEach(squareCell => {

        if(squareCell.squareId === selectedCell.squareId){
            neighborIds.push(squareCell.id)
        }

    })

    // if(squareCell.value === value){
        
        
    // }

}