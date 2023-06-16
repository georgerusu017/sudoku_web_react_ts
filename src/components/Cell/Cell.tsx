import { MouseEvent, useCallback, useState } from 'react'
import '../Cell/Cell.css'
type CellProps = {
    id: string ,
    value: string,
    setSelectedCell(id: string): void,
}

export default function Cell({ id, value, setSelectedCell }: CellProps) {

    const [cellId] = useState(id);
    const [cellValue, setValue] = useState(value);

    const handleSelection = useCallback((e:MouseEvent<HTMLDivElement>) => {
        setSelectedCell(id)
        console.log(id);
    },[id])

    return (
        <div className="cell" id={cellId} onClick={handleSelection}>
            {cellValue}
        </div>
    )
}
