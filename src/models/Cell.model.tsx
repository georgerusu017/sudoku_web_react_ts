export interface Cell {
    value: string,
    id: number,
    squareId: number,
    isEditable: boolean,
    isSelected: boolean,
    isHighlighted: boolean,
    isSibling: boolean,
}