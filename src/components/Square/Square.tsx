import CellComponent from "../CellComponent/CellComponent";
import "../Square/Square.css"
import { Cell } from "../../models/Cell.model";
type SquareProps = {
    id: string,
    cells : Cell[],
    onSelectCell(cell: Cell): void,
}

export default function Square({ id, cells , onSelectCell }: SquareProps) {

    return (
        <div className="square" id={id}>
            {
                cells.map((cell, index) => (
                    <CellComponent
                        key={`cell-${index}`}
                        cell={cell}
                        onSelectCell={onSelectCell}
                    />
                ))
            }
        </div>
    )
}
