import { Cell } from "../models/Cell.model";

export function selectCell(cell:Cell) {
    cell.isSelected = true;
}