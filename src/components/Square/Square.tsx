import Cell from "../Cell/Cell";
import "../Square/Square.css"

export default function Square(){
    const elements = [];

    for (let i = 1; i < 10; i++) {
        elements.push(<Cell value={i} id={`cell-${i}`}></Cell>)
    }
    
    return(
        <div className="square">
            {elements}
        </div>
     )

}