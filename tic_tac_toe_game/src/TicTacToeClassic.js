import React, { useState } from "react";

/**
 * Main container for TicTacToe Classic – 3x3 grid, two-player mode, win/draw detection, restart game.
 * Color scheme: primary (#ffffff), secondary (#222222), accent (#4caf50); Light theme
 */

// -- Constants for theme colors --
const COLORS = {
  primary: "#ffffff",    // background
  secondary: "#222222",  // typical text
  accent: "#4caf50",     // X/O highlight or button
  border: "#ddd",
  cellHover: "#eafdea", // light accent for hover
};

// All possible winning combinations (row, col, diag)
const WINNING_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],        // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8],        // columns
  [0, 4, 8], [2, 4, 6],                   // diagonals
];

// --- PUBLIC_INTERFACE ---
/**
 * Main TicTacToe Classic Game Container (3x3 board, status, and controls)
 */
function TicTacToeClassic() {
  // Use single array (9 items) for board state ('X', 'O', or null)
  const [board, setBoard] = useState(Array(9).fill(null));
  // True if it's X's turn, false for O
  const [xIsNext, setXIsNext] = useState(true);
  // 'X', 'O', or null (no winner yet). Set when win is detected.
  const winner = calculateWinner(board);

  // Find if draw (all filled & no winner)
  const isDraw = !winner && board.every(cell => cell !== null);

  // Handler for clicking a cell. Ignores if already filled or if game ended.
  // PUBLIC_INTERFACE
  function handleCellClick(idx) {
    if (board[idx] !== null || winner) return;
    const nextBoard = board.slice();
    nextBoard[idx] = xIsNext ? "X" : "O";
    setBoard(nextBoard);
    setXIsNext(!xIsNext);
  }

  // PUBLIC_INTERFACE
  function handleRestart() {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  }

  // Build the grid cells (3x3)
  function renderGrid() {
    return (
      <div className="ttt-grid" style={styles.grid}>
        {board.map((cell, idx) => (
          <Cell
            key={idx}
            value={cell}
            onClick={() => handleCellClick(idx)}
            disabled={Boolean(winner) || cell !== null}
            highlight={winner && winner.line && winner.line.includes(idx)}
          />
        ))}
      </div>
    );
  }

  let statusMsg;
  if (winner) {
    statusMsg = (
      <span style={{ color: COLORS.accent, fontWeight: 600 }}>
        {winner.player} wins!
      </span>
    );
  } else if (isDraw) {
    statusMsg = (
      <span style={{ color: COLORS.secondary, fontWeight: 500 }}>
        Draw!
      </span>
    );
  } else {
    statusMsg = (
      <span>
        Player <span style={{color: COLORS.accent, fontWeight: 600}}>{xIsNext ? "X" : "O"}</span>'s turn
      </span>
    );
  }

  return (
    <div className="ttt-container" style={styles.container}>
      {/* Player Turn Indicator */}
      <div className="ttt-turn-indicator" style={styles.turnIndicator}>
        {statusMsg}
      </div>
      {/* 3x3 Board */}
      {renderGrid()}
      {/* Game status and Restart */}
      <div className="ttt-controls" style={styles.controls}>
        <button
          className="ttt-restart-btn"
          style={styles.restartBtn}
          onClick={handleRestart}
        >
          Restart
        </button>
      </div>
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * Single cell (square) in the tic-tac-toe grid.
 * @param {object} props value, onClick, disabled, highlight
 */
function Cell({ value, onClick, disabled, highlight }) {
  return (
    <button
      className="ttt-cell"
      style={{
        ...styles.cell,
        color: value === "X" ? COLORS.accent : COLORS.secondary,
        backgroundColor: highlight
          ? COLORS.cellHover
          : COLORS.primary,
        cursor: disabled ? "default" : "pointer",
        fontWeight: highlight ? 700 : 500,
      }}
      onClick={onClick}
      disabled={disabled}
      aria-label={value ? `${value} placed` : "Empty cell"}
      tabIndex={0}
    >
      {value}
    </button>
  );
}

//
// --- Helper Functions ---
//

/**
 * Calculate winner by checking all possible winning lines
 * PUBLIC_INTERFACE
 * @param {array} squares  length=9 ["X","O",null,...]
 * @return {object|null} { player: "X"|"O", line: [lineIdxs] } or null
 */
function calculateWinner(squares) {
  for (let line of WINNING_LINES) {
    const [a, b, c] = line;
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return { player: squares[a], line };
    }
  }
  return null;
}

// --- Inline Styles for Light Theme ---
const styles = {
  container: {
    background: COLORS.primary,
    borderRadius: 14,
    padding: "36px 32px 24px 32px",
    boxShadow: "0 2px 10px 0 rgba(0,0,0,0.05)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 410,
    margin: "60px auto 0 auto",
  },
  turnIndicator: {
    marginBottom: 26,
    fontSize: "1.45rem",
    color: COLORS.secondary,
    fontWeight: 500,
    textAlign: "center",
    letterSpacing: "0.01em",
    minHeight: 32,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 72px)",
    gridTemplateRows: "repeat(3, 72px)",
    gap: "8px",
    margin: "0 auto 28px auto",
    background: COLORS.border,
    borderRadius: "12px",
    padding: 10,
  },
  cell: {
    width: 72,
    height: 72,
    fontSize: "2.3rem",
    borderRadius: "8px",
    border: `2px solid ${COLORS.border}`,
    outline: "none",
    background: COLORS.primary,
    transition: "background 0.13s, box-shadow 0.18s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "none",
    userSelect: "none",
  },
  controls: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  restartBtn: {
    background: COLORS.accent,
    color: "#fff",
    border: "none",
    borderRadius: 6,
    fontSize: "1.05rem",
    padding: "10px 24px",
    fontWeight: 600,
    marginLeft: 0,
    cursor: "pointer",
    boxShadow: "none",
    outline: "none",
    letterSpacing: "0.04em",
    transition: "background .2s",
  },
};

export default TicTacToeClassic;
