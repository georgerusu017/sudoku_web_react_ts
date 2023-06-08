import React, { FC } from 'react';
import { SudokuGameWrapper } from './SudokuGame.styled';

interface SudokuGameProps {}

const SudokuGame: FC<SudokuGameProps> = () => (
 <SudokuGameWrapper data-testid="SudokuGame">
    SudokuGame Component
 </SudokuGameWrapper>
);

export default SudokuGame;
