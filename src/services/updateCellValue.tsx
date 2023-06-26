import { Cell } from "../models/Cell.model";

export function updateCellValue(selectedCell: Cell, value: string) {
    if (!selectedCell.isEditable) {
        return
    }

    if (selectedCell.value === value) {
        selectedCell.value = '';
    }
    else {
        selectedCell.value = value;
    }

}