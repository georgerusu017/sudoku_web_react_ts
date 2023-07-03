import { useCallback } from 'react'
import './Cell.css'
import { Cell } from '../../models/Cell.model';
import { getCellClassName, getNotesClassName } from '../../services/cellManipulation.service';

type CellWithValue = {
    cell: Cell,
    onSelectCell(cell: Cell): void,
}

export default function CellComponent({ cell, onSelectCell }: CellWithValue) {

    const handleClick = useCallback(() => {
        onSelectCell(cell)
    }, [cell, onSelectCell])

    return (
        <div className={getCellClassName(cell)}
            id={`cell-${cell.id}`}
            onClick={handleClick}>
            {cell.value}
        </div>
    )
}
