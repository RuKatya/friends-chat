import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

function App({ setName, name }) {
  const [enterName, setEnterName] = useState()
  console.log(name)



  return (
    <div className="App">
      <h2>Welcome to chats</h2>
      <h3>Please enter your name to login</h3>

      <form>
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          onChange={(e) => {
            setName(e.target.value);
            setEnterName('')
          }}
          style={{ backgroundColor: name.length > 2 ? "lightgreen" : "white" }}
        />
      </form>
      {enterName ? <>{enterName}</> : null}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Link to={name ? "1111" : "/"} onClick={() => { name ? setEnterName('') : setEnterName('Please enter your name') }}>Room 1</Link>
        <Link to={name ? "2222" : "/"}>Room 2</Link>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
