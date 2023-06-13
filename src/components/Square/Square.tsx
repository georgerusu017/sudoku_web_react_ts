import Cell from "../Cell/Cell";
import "../Square/Square.css"

export default function Square(){
    const elements = [];

    for (let i = 0; i < 9; i++) {
        elements.push(<Cell></Cell>)
    }
    return(
        <div className="square">
            {elements}
        </div>
     )

}