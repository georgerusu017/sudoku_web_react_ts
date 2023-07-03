import { useCallback } from 'react'
import './Cell.css'
import { Cell } from '../../models/Cell.model';

type CellWithValue = {
    cell: Cell,
    onSelectCell(cell: Cell): void,
}

function getClassName(cell: Cell) {

    const className: string[] = ['cell'];

    cell.isSelected && className.push('highlightSelected');
    cell.isSibling && className.push('highlightSibling');
    cell.isHighlighted && className.push('highlight');
    cell.validationCount && className.push('highlightInvalid');
    cell.isEditable && className.push('isEditable');

    const classNameUnited = className.join(' ');

    return classNameUnited;
}

export default function CellComponent({ cell, onSelectCell }: CellWithValue) {

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
