import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../../index";

let textsTemp = [];

const RoomNumber = ({ name }) => {
  const [massages, setMassages] = useState([]);
  const [userNameGet, setUserNameGet] = useState();
  const [amountOfUsers, setAmountOfUsers] = useState();
  const [userList, setUserList] = useState();
  const [up, setUp] = useState(2);

  let { roomNumber } = useParams();

  // const namename = "Katya";
  useEffect(() => {
    if (roomNumber) {
      socket.emit("user-join", { roomNumber, name });
      // socket.auth = { namename };
      // socket.connect();
      // userNameEnter.push(name);
    }

    socket.on("user-get-in", (name) => {
      console.log(`user get in ${name}`);
      setUserNameGet(name);
    });

    socket.on("users-amount", (countOfUsers) => {
      console.log(`amount users ${countOfUsers}`);
      setAmountOfUsers(countOfUsers);
    });

    socket.on("user-message", ({ msg, name }) => {
      console.log(msg);
      console.log(name);
      if (msg && roomNumber) {
        textsTemp.push({ msg, roomNumber, name });
        setMassages(textsTemp);
        setUp(Math.random());
      }
    });

    socket.on("user-list", (connectedUsers) => {
      console.log(connectedUsers);
      setUserList(connectedUsers);
    });

    return () => {
      socket.emit("user-leave", { roomNumber, name });
      socket.off("user-message");
    };
  }, [roomNumber]);

  console.log(userList);

  function handleForm(e) {
    try {
      e.preventDefault();

      let msg = e.target.elements.msg.value;

      if (name) {
        if (msg.length > 0) {
          socket.emit("chat-user", { roomNumber, msg, name });
        } else {
          alert("message too short kapara");
        }
      } else {
        alert("Must include name bitch");
      }

      e.target.reset();
    } catch (error) {
      console.log(error);
    }
  }

  console.log(massages);

  return (
    <div>
      <h2>
        RoomNumber {roomNumber} | count of Users:{" "}
        <span>{userList ? <>{userList.length}</> : null}</span>
      </h2>

      <ul>
        {userList ? (
          <>
            {userList.map((user) => {
              return <li>{user}</li>;
            })}
          </>
        ) : (
          <>{null}</>
        )}
      </ul>

      <form onSubmit={handleForm}>
        <input type="text" name="msg" placeholder="Enter message" />
        <button type="submit">Send</button>
      </form>

      {userNameGet ? <div>User {userNameGet} is here</div> : null}

      <ul>
        {massages
          .filter((text) => text.roomNumber === roomNumber)
          .map((text, index) => {
            return (
              <li key={index}>
                {text.name}:{text.msg}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

RoomNumber.propTypes = {};

export default RoomNumber;
