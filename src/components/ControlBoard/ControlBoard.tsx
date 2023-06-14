import NumberButton from "../NumberButton/NumberButton"
import "../ControlBoard/ControlBoard.css"


export default function ControlBoard() {

    const numberButtons = Array.from({ length: 9 }, (_, index) => index + 1)

    return (
        <div className="control-board">
            <div className="control-buttons-board">
                <div className="control-div">
                    <button className="control-button" id="undo-button"></button>
                    <label>Undo</label>
                </div>
                <div className="control-div">
                    <button className="control-button" id="erase-button"></button>
                    <label>Erase</label>
                </div>
                <div className="control-div">
                    <button className="control-button" id="notes-button">
                        <div id="notesToggle">OFF</div>
                    </button>
                    <label>Notes</label>
                </div>
            </div>
            <div className="number-buttons">
                {numberButtons.map((number) => (
                    <NumberButton key={number} value={number} />
                ))}
                <button className="new-game-button">
                    New Game
                </button>
            </div>

        </div>
    )
}