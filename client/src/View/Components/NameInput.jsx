import React from "react";
import { useRef } from "react";

const NameInput = ({ setUserName }) => {
  const userName = useRef();

  function saveUser(e) {
    e.preventDefault();

    setUserName(userName.current.value);

    e.target.reset();
  }

  return (
    <div>
      <h3>Please enter your name to login</h3>
      <form onSubmit={saveUser}>
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          ref={userName}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default NameInput;
