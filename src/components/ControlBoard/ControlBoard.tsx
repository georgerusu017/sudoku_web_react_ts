import NumberButton from "../NumberButton/NumberButton"
import "../ControlBoard/ControlBoard.css"


export default function ControlBoard() {

    const numberButtons = []
    for (let i = 0; i < 9; i++) {
        // value din map, line 29
        numberButtons.push(<NumberButton value={1}></NumberButton>)
    }

    // array 1-9 

    return (
        <div className="control-board">
            <div className="control-buttons">
                <div className="control-div">
                    <button className="control-button"></button>
                    <label>?</label>
                </div>
                <div className="control-div">
                    <button className="control-button"></button>
                    <label>?</label>
                </div>
                <div className="control-div">
                    <button className="control-button"></button>
                    <label>?</label>
                </div>
            </div>
            <div className="number-buttons">
                {/* map  value din map 1-9*/}
                {numberButtons}
                <div className="new-game-button">
                    New Game
                </div>
            </div>

        </div>
    )

}