import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <h2>HI</h2>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Link to={"/1111"}>Room 1</Link>
        <Link to={"/2222"}>Room 2</Link>
      </div>
    </div>
  );
}

export default App;
