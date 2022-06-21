import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

function App({ setName, name }) {
  const [enterName, setEnterName] = useState()
  console.log(name)

  return (
    <div className="app">
      <div className="app__context">
        <h1>Welcome to chats</h1>
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
        {enterName ? <div className="app__context--enterName">{enterName}</div> : null}
        <div className="app__context--listChats">
          <Link to={name ? "1111" : "/"} onClick={() => { name ? setEnterName('') : setEnterName('Please enter your name') }}>Room 1</Link>
          <Link to={name ? "2222" : "/"} onClick={() => { name ? setEnterName('') : setEnterName('Please enter your name') }}>Room 2</Link>
          <Link to={name ? "3333" : "/"} onClick={() => { name ? setEnterName('') : setEnterName('Please enter your name') }}>Room 3</Link>
          <Link to={name ? "4444" : "/"} onClick={() => { name ? setEnterName('') : setEnterName('Please enter your name') }}>Room 4</Link>
          <Link to={name ? "5555" : "/"} onClick={() => { name ? setEnterName('') : setEnterName('Please enter your name') }}>Room 5</Link>
          <Link to={name ? "6666" : "/"} onClick={() => { name ? setEnterName('') : setEnterName('Please enter your name') }}>Room 6</Link>
          <Outlet />
        </div>
      </div>

    </div>
  );
}

export default App;
