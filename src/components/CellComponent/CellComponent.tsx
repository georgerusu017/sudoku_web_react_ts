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


    // mutat in Square, si trimis direct cellContent value sau notite
    function getNotesDiv() {
        const notesDivs = []

        for (let i = 0; i < 9; i++){
            notesDivs.push(<div className='note-cell'> {cell.noteValues[i]} </div>)
        }
        return notesDivs
    }
    //

    // si verificarea tot in Square
    const cellContent = cell.isNote ? getNotesDiv() : cell.value;
    //

    return (
        // si className
        <div className={cell.isNote ? getNotesClassName(cell) : getCellClassName(cell)}
            id={`cell-${cell.id}`}
            onClick={handleClick}>
            {cellContent}
        </div>
    )
}
