import { useCallback } from "react"
import "../NumberButton/NumberButton.css"
type NumberButtonProps = {
    value: number,
    onNumberButtonClick(numberValue: string): void
}

export default function NumberButton({ value, onNumberButtonClick }: NumberButtonProps) {

    const handleClick = useCallback(() => {
        const valueString = value.toString()
        onNumberButtonClick(valueString)
    }, [onNumberButtonClick, value])

    return (
        <button className="number-button"
            onClick={handleClick}>
            {value}
        </button>
    )
}