import { useCallback, useState } from 'react'
import '../Cell/Cell.css'
type CellProps = {
    id: string ,
    value: string,
    onSelectCell(id: string): void,
}

export default function Cell({ id, value, onSelectCell }: CellProps) {

    const [cellId] = useState(id);
    const [cellValue] = useState(value);

    const className = ''

    const handleClick = useCallback(() => {
        onSelectCell(id)
    },[id,onSelectCell])

    return (
        <div className={className} id={cellId} onClick={handleClick}>
            {cellValue}
        </div>
    )
}
