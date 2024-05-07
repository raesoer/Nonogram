// TODO:
// Make table scrollable with fixed left clues

import styles from "./page.module.css";

function GridCell({ id, value }) {
  return (
    <td key={"td-" + id}>
      <button key={"b-" + id} className={styles.square}>
        {value}
      </button>
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

  return (
    <table className={styles.puzzle}>
      <tbody>
        <tr key="tr-0">
          <td key="td-0" />
          {topClues.map((clues, index) => (
            <ClueCell
              key={"tc" + (index + 1).toString()}
              id={"tc" + (index + 1).toString()}
              clues={clues}
              horizontal={false}
            />
          ))}
        </tr>
        {leftClues.map((clues, index) => (
          <tr key={"tr-" + (index + 1).toString()}>
            <ClueCell
              key={"lc" + (index + 1).toString()}
              id={"lc" + (index + 1).toString()}
              clues={clues}
              horizontal={true}
            />
            {puzzle[index].split("").map((value, i) => (
              <GridCell
                key={"g-" + (index + 1).toString() + "-" + (i + 1).toString()}
                id={"g-" + (index + 1).toString() + "-" + (i + 1).toString()}
                value={value}
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
