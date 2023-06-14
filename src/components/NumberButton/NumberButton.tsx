import "../NumberButton/NumberButton.css"
type NumberButtonProps = { value: number }

export default function NumberButton( {value} : NumberButtonProps ){
    return(
        <button className="number-button">
            {value}
        </button>
     )
}