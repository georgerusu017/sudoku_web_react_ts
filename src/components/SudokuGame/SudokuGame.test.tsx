import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SudokuGame from './SudokuGame';

describe('<SudokuGame />', () => {
  test('it should mount', () => {
    render(<SudokuGame />);
    
    const sudokuGame = screen.getByTestId('SudokuGame');

    expect(sudokuGame).toBeInTheDocument();
  });
});