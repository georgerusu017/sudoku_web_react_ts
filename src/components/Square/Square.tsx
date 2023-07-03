import CellWithNotes from "../CellComponents/CellWithNotes";
import "../Square/Square.css"
import { Cell } from "../../models/Cell.model";
import CellWithValue from "../CellComponents/CellWithValue";

type SquareProps = {
    cells: Cell[],
    onSelectCell(cell: Cell): void,
}

export default function Square({ cells, onSelectCell }: SquareProps) {

    return (
        <div className="square">
            {
                // cells.map((cell, index) => (
                //     (cell.noteValues.length > 0) ?
                //         <CellWithNotes
                //             key={`cell-${index}`}
                //             cell={cell}
                //             onSelectCell={onSelectCell}
                //         />
                //         :
                //         <CellWithValue
                //             key={`cell-${index}`}
                //             cell={cell}
                //             onSelectCell={onSelectCell}
                //         />

                // ))

                cells.map((cell, index) => {
                    if (cell.noteValues.length > 0) {
                        return <CellWithNotes
                            key={`cell-${index}`}
                            cell={cell}
                            onSelectCell={onSelectCell}
                        />
                    }
                    return <CellWithValue
                        key={`cell-${index}`}
                        cell={cell}
                        onSelectCell={onSelectCell}
                    />
                })
            }
        </div>
    )
}
