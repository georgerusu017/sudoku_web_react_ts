import { Cell } from "../models/Cell.model";


export function updateCellValue(selectedCell: Cell, event: string){
    if(selectedCell.isEditable === true){

        if (/^[1-9]$/.test(event)){

            if(selectedCell.value === ''){
                selectedCell.value = event;
            }
            else if(selectedCell.value === event){
                selectedCell.value = '';
            }
        }

    }
}