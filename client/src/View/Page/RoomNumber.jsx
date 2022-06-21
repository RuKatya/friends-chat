import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../../index";

let textsTemp = [];

const RoomNumber = () => {
  const [name, setName] = useState();
  const [massages, setMassages] = useState([]);
  const [up, setUp] = useState(2);

  let { roomNumber } = useParams();

  // const namename = "Katya";
  useEffect(() => {
    if (roomNumber) {
      socket.emit("user-join", roomNumber);
      // socket.auth = { namename };
      // socket.connect();
    }

    socket.on("user-message", ({ msg, name }) => {
      console.log(msg);
      console.log(name);
      if (msg && roomNumber) {
        textsTemp.push({ msg, roomNumber, name });
        setMassages(textsTemp);
        setUp(Math.random());
      }
    });

    return () => {
      socket.emit("user-leave", roomNumber);
      socket.off("user-message");
    };
  }, [roomNumber]);

  function handleForm(e) {
    try {
      e.preventDefault();

      let msg = e.target.elements.msg.value;
      // console.log(name);

      // console.log(msg);
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

  // console.log(name);

  console.log(massages);

  return (
    <div>
      <h2>RoomNumber {roomNumber}</h2>
      <div>
        {/* {name ? (
          <div>
            {" "}
            User<span>{name}</span>is here
          </div>
        ) : null}{" "} */}
      </div>
      <form>
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </form>

      <form onSubmit={handleForm}>
        <input type="text" name="msg" placeholder="Enter message" />
        <button type="submit">Send</button>
      </form>

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
