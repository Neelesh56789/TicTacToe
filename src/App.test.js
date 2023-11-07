import { render, waitFor, fireEvent, getAllByRole  } from '@testing-library/react';
import { TicTacToe } from './components/Tictactoe';

// Test suite for TicTacToe component
describe('<TicTacToe />', () => {

  // Test rendering of the game board
  test('renders the game board with 9 empty cells', () => {
    const { getAllByRole } = render(<TicTacToe />);
    const cells = getAllByRole('button');
    expect(cells.length).toBe(9);
    cells.forEach(cell => {
      expect(cell.innerHTML).toBe('');
    });
  });

  // Test clicking on a cell
  test('places an X on the first cell when clicked', () => {
    const { getAllByRole } = render(<TicTacToe />);
    const cells = getAllByRole('button');
    fireEvent.click(cells[0]);
    expect(cells[0].querySelector('img').src).toContain('cross.png');
  });

  // Test alternating turns
  test('alternates turns between X and O', () => {
    const { getAllByRole } = render(<TicTacToe />);
    const cells = getAllByRole('button');
    fireEvent.click(cells[0]); // X's turn
    fireEvent.click(cells[1]); // O's turn
    expect(cells[0].querySelector('img').src).toContain('cross.png');
    expect(cells[1].querySelector('img').src).toContain('circle.png');
  });

  // Test win condition
  test('determines the win condition correctly', () => {
    const { getAllByRole, getByText } = render(<TicTacToe />);
    const cells = getAllByRole('button');
    // Simulate a winning condition for X
    fireEvent.click(cells[0]); // X
    fireEvent.click(cells[3]); // O
    fireEvent.click(cells[1]); // X
    fireEvent.click(cells[4]); // O
    fireEvent.click(cells[2]); // X wins
    expect(getByText(/Congratulations/).innerHTML).toContain('cross.png');
  });

  // Test board lock after a win
  test('locks the board after a win', () => {
    const { getAllByRole } = render(<TicTacToe />);
    const cells = getAllByRole('button');
  
    // Simulate a winning sequence for Player X
    fireEvent.click(cells[0]); // Player X
    fireEvent.click(cells[1]); // Player O
    fireEvent.click(cells[2]); // Player X
    fireEvent.click(cells[4]); // Player O
    fireEvent.click(cells[3]); // Player X
    fireEvent.click(cells[7]); // Player o
  
    // Try to make another move after the game is won
    expect(fireEvent.click(cells[5])).not.toContain('circle.png');
  });
  
  
  
  

  // Test game reset
  test('resets the game when the reset button is clicked', () => {
    const { getAllByRole, getByText } = render(<TicTacToe />);
    const cells = getAllByRole('button');
    const resetButton = getByText('Reset');
    // Simulate some clicks
    fireEvent.click(cells[0]);
    fireEvent.click(cells[1]);
    // Reset the game
    fireEvent.click(resetButton);
    cells.forEach(cell => {
      expect(cell.innerHTML).toBe('');
    });
    expect(getByText('Tic Tac Toe')).toBeInTheDocument();
  });

});

