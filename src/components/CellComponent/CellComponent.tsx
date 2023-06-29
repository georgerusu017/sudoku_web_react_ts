import { useCallback } from 'react'
import './Cell.css'
import { Cell } from '../../models/Cell.model';
import { getCellClassName } from '../../services/cellManipulation.service';

type CellProps = {
    cell: Cell,
    onSelectCell(cell: Cell): void,
}

export default function CellComponent({ cell, onSelectCell }: CellProps) {

    const handleClick = useCallback(() => {
        onSelectCell(cell)
    }, [cell, onSelectCell])

    const cellContent = cell.isNote ? cell.noteValues.join('') : cell.value;

    return (
        <div className={getCellClassName(cell)}
            id={`cell-${cell.id}`}
            onClick={handleClick}>
            {cellContent}
        </div>
    )
}
