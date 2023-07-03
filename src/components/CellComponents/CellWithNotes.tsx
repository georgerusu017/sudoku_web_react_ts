import { useCallback } from 'react'
import './Cell.css'
import { Cell } from '../../models/Cell.model';

type CellWithNotesProps = {
    cell: Cell,
    onSelectCell(cell: Cell): void,
}

function getNotesClassName(cell: Cell){

    const className: string[] = ['cell'];

    cell.isSelected && className.push('highlightSelected');
    cell.isHighlighted && className.push('highlight');
    cell.isEditable && className.push('isEditable');

    const classNameUnited = className.join(' ');
    return classNameUnited;
}

export default function CellWithNotes({ cell, onSelectCell }: CellWithNotesProps) {

    const handleClick = useCallback(() => {
        onSelectCell(cell)
    }, [cell, onSelectCell])

    const notesDivs = []

    for (let i = 0; i < 9; i++) {
        notesDivs.push(<div className='note-cell'> {cell.noteValues[i]} </div>)
    }

    return (
        <div className={getNotesClassName(cell)}
            id={`cell-${cell.id}`}
            onClick={handleClick}>
            {notesDivs}
        </div>
    )
}