import { CellModel } from "../models/Cell.model";

function findSquareNeighbors() {
    // const div = document.getElementById(this.idText);

    // return [...div.parentNode.childNodes]
    //     .filter(cellHtml => cellHtml.id != this.idText)
    //     .map((cellHtml) => parseInt(cellHtml.id.split("-").pop()))
}

function findLineNeighbors(id:number) {

    let smallerNum = id;
    let largerNum = id;
    let output = [];
    if (id % 9 === 0) {
        largerNum++;
    }
    else {
        smallerNum--;
    }

    while (smallerNum % 9 !== 0) {
        smallerNum--;
    }

    while (largerNum % 9 !== 8) {
        largerNum++;
    }

    const neighbors = [];

    for (let i = smallerNum; i <= largerNum; i++) {
        neighbors.push(i);
    }

    output = neighbors.filter(item => item !== id)

    return output;
}

function findColumnNeighbors(id:number) {
    let smallerNum = id;
    let largerNum = id;
    let output = [];

    while (smallerNum - 9 >= 0) {
        smallerNum -= 9;
    }

    while (largerNum + 9 <= 80) {
        largerNum += 9;
    }

    const neighbors = [];

    for (let i = smallerNum; i <= largerNum; i += 9) {
        neighbors.push(i);
    }

    output = neighbors.filter(item => item !== id)

    return output;
}

export function findNeighbors(cell:CellModel){
    let neighbors = []
    neighbors.push(findColumnNeighbors(cell.id))
    neighbors.push(findLineNeighbors(cell.id))

    return neighbors
}