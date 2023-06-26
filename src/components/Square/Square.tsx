import CellComponent from "../CellComponent/CellComponent";
import "../Square/Square.css"
import { Cell } from "../../models/Cell.model";

type SquareProps = {
    cells : Cell[],
    onSelectCell(cell: Cell): void,
}

export default function Square({ cells , onSelectCell }: SquareProps) {

    return (
        <div className="square">
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
