function GridCell() {
  return (
    <button className="grid-cell" />
  );
}

function GridRow() {
    return (

    )
}

function Grid({ width, height }) {}

function CluesTop({ clues }) {}

function CluesLeft({ clues }) {}

function Puzzle({ puzzle }) {
  // work out top and left arrays
  const dummy = [[], [1, 3], [5], [], [], [], [], [6, 5, 4, 3]];
  const width = puzzle[0].length;
  const height = puzzle.length;
  return (
    <div>
      <div className="left-top" />
      <div className="right-top">
        <CluesTop clues={dummy} />
      </div>
      <div className="left-bottom">
        <CluesLeft clues={dummy} />
      </div>
      <div className="right-bottom">
        <Grid width={width} height={height} />
      </div>
    </div>
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
