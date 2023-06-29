export interface Cell {
    value: string,
    isNote: boolean,
    noteValues: string[],
    id: number,
    squareId: number,
    validationIndex: number,
    isEditable: boolean,
    isSelected: boolean,
    isHighlighted: boolean,
    isSibling: boolean,
}