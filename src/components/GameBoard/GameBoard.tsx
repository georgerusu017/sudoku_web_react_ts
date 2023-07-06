import Square from "../Square/Square";
import "../GameBoard/GameBoard.css";
import { Cell } from "../../models/Cell.model";

type GameBoardProps = {
  cells: Cell[];
  backgroundClassName: string;
  onSelectCell(cell: Cell): void;
  onPlayClick(): void;
};

export default function GameBoard({
  cells,
  onSelectCell,
  backgroundClassName,
  onPlayClick,
}: GameBoardProps) {
  const squares: Cell[][] = [];

  for (let i = 0; i < 9; i++) {
    let square: Cell[] = [];
    for (let j = 0; j < 9; j++) {
      square.push(cells[9 * i + j]);
    }
    squares.push(square);
  }

  return (
    <>
      <div className="game-board">
        {squares.map((squareCells, index) => (
          <Square
            key={`square-${index}`}
            cells={squareCells}
            onSelectCell={onSelectCell}
          />
        ))}
        <div className={backgroundClassName} onClick={onPlayClick}>
        </div>
      </div>
    </>
  );
}
