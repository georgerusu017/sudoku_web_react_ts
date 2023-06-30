import { useCallback } from 'react'
import './Cell.css'
import { Cell } from '../../models/Cell.model';
import { getCellClassName, getNotesClassName } from '../../services/cellManipulation.service';

type CellProps = {
    cell: Cell,
    onSelectCell(cell: Cell): void,
}

export default function CellComponent({ cell, onSelectCell }: CellProps) {

    const handleClick = useCallback(() => {
        onSelectCell(cell)
    }, [cell, onSelectCell])

    function getNotesDiv() {
        const notesDivs = []

        for (let i = 0; i < 9; i++){
            notesDivs.push(<div className='note-cell'> {cell.noteValues[i]} </div>)
        }
        return notesDivs
    }

    const cellContent = cell.isNote ? getNotesDiv() : cell.value;

    return (
        <div className={cell.isNote ? getNotesClassName(cell) : getCellClassName(cell)}
            id={`cell-${cell.id}`}
            onClick={handleClick}>
            {cellContent}
        </div>
    )
}
