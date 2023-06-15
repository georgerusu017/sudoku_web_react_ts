import { useState } from 'react'
import '../Cell/Cell.css'
type CellProps = {
    id: string ,
    value: number
}

export default function Cell({ id, value }: CellProps) {

    const [cellId] = useState(id);
    const [cellValue, setValue] = useState(value);

    return (
        <div className="cell" id={cellId}>
            {cellValue}
        </div>
    )
}
