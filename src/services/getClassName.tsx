import { Cell } from "../models/Cell.model"

export function getClassName(cell:Cell){
    let className = 'cell'
    if(cell.isSelected) {
        className += ' highlightSelected'
    }
    
    if(cell.isSibling) {
        className += ' highlightSibling'
    }
    return className
}