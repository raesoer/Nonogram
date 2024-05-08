"use client";

// TODO:
// Make table scrollable with fixed left clues

import styles from "./page.module.css";
import { useState } from "react";

function GridCell({ id, state, onGridCellClick }) {
  const bgColor = state == 1 ? "black" : "white";
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

function Puzzle({ puzzle }) {
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
    console.log(i.toString() + "-" + j.toString());
    console.log(nextGridState[i][j]);
    if (nextGridState[i][j] == 0) {
      nextGridState[i][j] = 1;
    } else {
      nextGridState[i][j] = 0;
    }
    setGridState(nextGridState);
    console.log(gridState);
  }

  return (
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
                onGridCellClick={() => handleClick(i, j)}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const PUZZLE = [
  "0101010",
  "0111110",
  "0100010",
  "0000000",
  "1111111",
  "0101010",
  "0101010",
];

export default function App() {
  return <Puzzle puzzle={PUZZLE} />;
}
