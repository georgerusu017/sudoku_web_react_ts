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

    // const [cellId] = useState(id);
    // const [cellValue] = useState(value);

    // useEffect(() => {
    //     if(cell.isSelected) {
    //         setClassName('cell highlightSelected')
    //     }
    //     console.log(className);
    // }, [cell.isSelected, className])
    // if(cell.isSelected) className.concat("highlightSelected")
    // if(cell.isSibling) className.concat("highlightSibling")


    const handleClick = useCallback(() => {
        onSelectCell(cell)
    }, [cell, onSelectCell])

    return (
        <div className={getClassName(cell)}
            id={cell.id}
            onClick={handleClick}>
            {cell.value}
        </div>
    )
}
