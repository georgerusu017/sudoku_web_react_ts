export interface Cell {
    value: string,
    noteValues: string[],
    id: number,
    squareId: number,
    validationCount: number,
    isEditable: boolean,
    isSelected: boolean,
    isHighlighted: boolean,
    isSibling: boolean,
}