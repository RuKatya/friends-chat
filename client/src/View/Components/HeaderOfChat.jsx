import { useState, useRef } from "react";

const HeaderOfChat = ({ roomNumber, setUserName }) => {
  const [showFormChangeName, setShowFormChangeName] = useState(false);
  const userName = useRef();

  function changeName() {
    setShowFormChangeName(!showFormChangeName);
  }

  function saveUser(e) {
    e.preventDefault();

    setUserName(userName.current.value);
    setShowFormChangeName(false);

    e.target.reset();
  }

  return (
    <div className="headerRoomChat">
      <h2 className="headerRoomChat__title">Room: {roomNumber}</h2>
      <button onClick={changeName} className="headerRoomChat__changeNameBtn">
        {showFormChangeName ? "X" : "Change name"}
      </button>
      {showFormChangeName ? (
        <>
          <form onSubmit={saveUser} className="headerRoomChat__form">
            <input
              type="text"
              name="name"
              placeholder="Enter name"
              ref={userName}
            />
            <button type="submit">Save</button>
          </form>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default HeaderOfChat;
