import { CellModel } from "../models/Cell.model";

export function selectCell(cell:CellModel) {
    cell.isSelected = true;
}