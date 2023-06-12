import NumberButton from "../NumberButton/NumberButton"


export default function ControlBoard(){

    const numberButtons = []
   
    for (let i = 0; i < 9; i++) {
        numberButtons.push(<NumberButton></NumberButton>)
    }

    return(
        <div className="control-board">
            <div className="control-buttons">

            </div>
            <div className="number-buttons">
                {numberButtons}
            </div>
            <div className="new-game"></div>
        </div>
     )

}