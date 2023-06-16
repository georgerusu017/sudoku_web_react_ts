import { useState } from "react";
import Cell from "../Cell/Cell";
import "../Square/Square.css"
type SquareProps = {
    id: string,
    cellIds: string[],
    squareValues: string[],
    onSelectCell(id: string): void,
}

export default function Square({ id, squareValues, cellIds, onSelectCell }: SquareProps) {

    const [squareId] = useState(id);

    return (
        <div className="square" id={squareId}>
            {
                squareValues.map((value, index) => (
                    <Cell
                        key={`cell-${index}`}
                        id={`cell-${cellIds[index]}`}
                        value={value}
                        onSelectCell={onSelectCell}
                    />
                ))
            }
        </div>
    )
}