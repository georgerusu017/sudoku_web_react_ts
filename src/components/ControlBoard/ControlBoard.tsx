import NumberButton from "../NumberButton/NumberButton"
import "../ControlBoard/ControlBoard.css"


export default function ControlBoard() {

    const numberButtons = []

    for (let i = 0; i < 9; i++) {
        numberButtons.push(<NumberButton></NumberButton>)
    }

    return (
        <div className="control-board">
            <div className="control-buttons">
                <button className="control-button"></button>
                <button className="control-button"></button>
                <button className="control-button"></button>
            </div>
            <div className="number-buttons">
                {numberButtons}
            </div>
            <div className="new-game-button">
                New Game
            </div>
        </div>
    )

}