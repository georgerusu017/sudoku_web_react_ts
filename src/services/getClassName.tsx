import { Cell } from "../models/Cell.model"

export function getClassName(cell:Cell){
    let className = 'cell'
    if(cell.isSelected) {
        className += ' highlightSelected'
    }
    
    if(cell.isSibling) {
        className += ' highlightSibling'
    }

    if(cell.isHighlighted) {
        className += ' highlight'
    }

    if(cell.validationIndex > 0){
        className += ' highlightInvalid'
    }
    return className
}