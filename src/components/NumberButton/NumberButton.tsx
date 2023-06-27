import { useCallback } from "react"
import "../NumberButton/NumberButton.css"
type NumberButtonProps = {
    value: number,
    onClick(numberValue: string): void
}

export default function NumberButton({ value, onClick }: NumberButtonProps) {

    const handleClick = useCallback(() => {

        const valueString = value.toString();
        onClick(valueString);
        
    }, [onClick, value])

    return (
        <button className="number-button"
            onClick={handleClick}>
            {value}
        </button>
    )
}