import { useCallback, useState } from 'react'
import '../Cell/Cell.css'
import { CellModel } from '../../models/Cell.model';
type CellProps = {
    cell: CellModel,
    onSelectCell(cell: CellModel): void,
}

export default function Cell({ cell, onSelectCell }: CellProps) {

    // const [cellId] = useState(id);
    // const [cellValue] = useState(value);
    const [className, setClassName] = useState(`cell`)

    const handleClick = useCallback(() => {
        onSelectCell(cell)
    }, [cell, onSelectCell])

    return (
        <div className={`cell ` + className}
            id={cell.id}
            onClick={handleClick}>
            {cell.value}
        </div>
    )
}
