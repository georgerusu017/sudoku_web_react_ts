import { useCallback, useState, useEffect } from 'react'
import './Cell.css'
import { Cell } from '../../models/Cell.model';
import { getClassName } from '../../services/getClassName';
type CellProps = {
    cell: Cell,
    onSelectCell(cell: Cell): void,
}

export default function CellComponent({ cell, onSelectCell }: CellProps) {

    const handleClick = useCallback(() => {
        onSelectCell(cell)
    }, [cell, onSelectCell])

    return (
        <div className={getClassName(cell)}
            id={`cell-${cell.id}`}
            onClick={handleClick}>
            {cell.value}
        </div>
    )
}
