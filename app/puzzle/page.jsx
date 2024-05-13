"use client";

// TODO:
// Add X toggle option
// Add tick to row / col when correct
// drag block
// Make table scrollable with fixed left clues
// Build API to return puzzles with titles
// Color versions

import { useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import instructionPng from "./nongram-instructions.png";

function GridCell({ id, state, puzzleState, onGridCellClick }) {
  const bgColor =
    state == 1 && puzzleState == 0
      ? "darkred"
      : state == 1
        ? "darkturquoise"
        : "white";
  //console.log(bgColor);
  return (
    <td key={"td-" + id}>
      <button
        key={"b-" + id}
        className={styles.square}
        style={{ backgroundColor: bgColor }}
        onClick={onGridCellClick}
      ></button>
    </td>
  );
}

function ClueCell({ id, clues }) {
  //console.log(clues);
  return (
    <td key={"td-" + id}>
      {clues.map((clue, index) => (
        <div key={"d-" + id + "-" + index}>{clue}</div>
      ))}
    </td>
  );
}

function Words() {
  return (
    <>
      <div className={styles.heading}>
        Nonogram / Griddler / Japanese puzzle / Tsunami
      </div>
      <div className={styles.intro}>
        <p>
          Lots of different names for the same puzzle. Use the digits to create
          a pattern in the grid. Each number represents a block of squares to be
          blacked out in that row or column. Incorrect selections will turn red.
        </p>
        <p>
          <a href="#example">Example below</a>
        </p>
      </div>
    </>
  );
}

function Example() {
  return (
    <div id="example" className={styles.instructions}>
      <p>Example</p>
      <Image src={instructionPng} alt="Instructions" />
    </div>
  );
}

function Puzzle({ puzzle, title }) {
  const width = puzzle[0].length;
  const height = puzzle.length;

  const [gridState, setGridState] = useState(
    Array.from({ length: height }, () =>
      Array.from({ length: width }, () => 0),
    ),
  );

  // top clues
  const topClues = [];
  for (let i = 0; i < width; i++) {
    let clues = [];
    let count = 0;
    for (let j = 0; j < height; j++) {
      let clue = puzzle[j][i];
      if (clue == "1") count = count + 1;
      else {
        if (count > 0) clues.push(count);
        count = 0;
      }
      if (j == height - 1 && count > 0) clues.push(count);
    }
    topClues.push(clues);
  }

  // left clues
  const leftClues = [];
  for (let i = 0; i < height; i++) {
    let clues = [];
    let count = 0;
    for (let j = 0; j < width; j++) {
      let clue = puzzle[i][j];
      if (clue == "1") count = count + 1;
      else {
        if (count > 0) clues.push(count);
        count = 0;
      }
      if (j == width - 1 && count > 0) clues.push(count);
    }
    leftClues.push(clues);
  }

  function handleClick(i, j) {
    const nextGridState = gridState.slice();
    if (nextGridState[i][j] == 0) {
      nextGridState[i][j] = 1;
    } else {
      nextGridState[i][j] = 0;
    }
    setGridState(nextGridState);
  }

  const done = calculateDone(puzzle, gridState);
  let result;
  if (done) {
    result = "That's it! Puzzle complete. Title: " + title;
  } else {
    result = "";
  }

  return (
    <>
      <Words />
      <div className={styles.result}>{result}</div>
      <table className={styles.puzzle}>
        <tbody>
          <tr key="tr-0" className={styles.toprow}>
            <td key="td-0" />
            {topClues.map((clues, index) => (
              <ClueCell
                key={"tc" + (index + 1).toString()}
                id={"tc" + (index + 1).toString()}
                clues={clues}
              />
            ))}
          </tr>
          {leftClues.map((clues, i) => (
            <tr key={"tr-" + (i + 1).toString()} className={styles.mainrow}>
              <ClueCell
                key={"lc" + (i + 1).toString()}
                id={"lc" + (i + 1).toString()}
                clues={clues}
              />
              {puzzle[i].split("").map((value, j) => (
                <GridCell
                  key={"g-" + (i + 1).toString() + "-" + (j + 1).toString()}
                  id={"g-" + (i + 1).toString() + "-" + (j + 1).toString()}
                  state={gridState[i][j]}
                  puzzleState={puzzle[i][j]}
                  onGridCellClick={() => handleClick(i, j)}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <Example />
    </>
  );
}

function calculateDone(puzzle, gridState) {
  for (let i = 0; i < gridState.length; i++) {
    let stateRow = "";
    for (let j = 0; j < gridState[i].length; j++) {
      stateRow = stateRow + gridState[i][j];
    }
    //console.log(puzzle[i]);
    //console.log(stateRow);
    if (puzzle[i] != stateRow) {
      return false;
    }
  }
  return true;
}

const PUZZLE = ["010", "011", "010", "010"];
const TITLE = "TEST";

// const PUZZLE = [
//   "00000111100000",
//   "00011111111000",
//   "00111111111100",
//   "01110011110010",
//   "01111001111000",
//   "01111001111000",
//   "11100001100001",
//   "11110011110011",
//   "11111111111111",
//   "11111111111111",
//   "11111111111111",
//   "11111111111111",
//   "11111111111111",
//   "11110111101111",
//   "01100011000110",
// ];
// const TITLE = "INKY";

export default function App() {
  return <Puzzle puzzle={PUZZLE} title={TITLE} />;
}
