import { useState } from "react";
import Cell from "../Cell/Cell";
import "../Square/Square.css"
type SquareProps = {
    id: string
}

export default function Square({id} : SquareProps){

    const elements = [];
    const [squareId] = useState(id);

    const cells = Array.from({ length: 9 }, (_, index) => index + 1)

    return(
        <div className="square" id={squareId}>
            {cells.map((number) => (
                    <Cell key={`cell-${number}`} id={`cell-${number}`} value={number} />
                ))}
        </div>
     )

}