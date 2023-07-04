import NumberButton from "../NumberButton/NumberButton"
import "../ControlBoard/ControlBoard.css"
import { useCallback } from "react"
import { getNotesToggleClassName } from "../../services/layout.service"

type ControlBoardProps = {
    onNewGameClick(): void,
    onNumberButtonClick(value: string): void,
    onDeleteClick(value: string): void,
    onNotesClick(): void,
    onUndoClick(): void,
    notesToggle: boolean
}

export default function ControlBoard({ onNewGameClick, onNumberButtonClick, onDeleteClick, onNotesClick, onUndoClick, notesToggle }: ControlBoardProps) {

    const numberButtons = Array.from({ length: 9 }, (_, index) => index + 1)
    const notesText = notesToggle ? "ON" : "OFF";

    const handleDelete = useCallback(() => {

        onDeleteClick('')

    }, [onDeleteClick])

    const handleUndo = useCallback(() => {

        onUndoClick()

    }, [onUndoClick])

    return (
        <div className="control-board">
            <div className="control-buttons-board">

                <div className="control-div">
                    <button
                        className="control-button"
                        id="undo-button"
                        onClick={handleUndo}
                    ></button>
                    <label>Undo</label>
                </div>

                <div className="control-div">
                    <button
                        className="control-button"
                        id="erase-button"
                        onClick={handleDelete}
                    ></button>
                    <label>Erase</label>
                </div>

                <div className="control-div">
                    <button
                        className="control-button"
                        id="notes-button"
                        onClick={onNotesClick}>
                        <div
                            id="notesToggle"
                            className={getNotesToggleClassName(notesToggle)}>
                            {notesText}
                        </div>

                    </button>
                    <label>Notes</label>
                </div>

            </div>

            <div className="number-buttons">

                {numberButtons.map((number) => (
                    <NumberButton
                        onClick={onNumberButtonClick}
                        key={`number-button${number}`}
                        value={number} />
                ))}

                <button
                    className="new-game-button"
                    onClick={onNewGameClick}>
                    New Game
                </button>

            </div>

        </div>
    )
}