import { useCallback, useState, useEffect } from 'react'
import '../Cell/Cell.css'
import { CellModel } from '../../models/Cell.model';
import { selectCell } from '../../services/selectCell';
import { getClassName } from '../../services/getClassName';
type CellProps = {
    cell: CellModel,
    onSelectCell(cell: CellModel): void,
}

export default function Cell({ cell, onSelectCell }: CellProps) {

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
