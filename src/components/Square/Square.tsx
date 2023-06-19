import { useState } from "react";
import Cell from "../Cell/Cell";
import "../Square/Square.css"
import { CellModel } from "../../models/Cell.model";
type SquareProps = {
    id: string,
    cells : CellModel[],
    onSelectCell(cell: CellModel): void,
}

export default function Square({ id, cells , onSelectCell }: SquareProps) {

    return (
        <div className="square" id={id}>
            {
                cells.map((cell, index) => (
                    <Cell
                        key={`cell-${index}`}
                        cell={cell}
                        onSelectCell={onSelectCell}
                    />
                ))
            }
        </div>
    )
}