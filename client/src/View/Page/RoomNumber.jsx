import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../../index";

let textsTemp = [];

const RoomNumber = () => {
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

    socket.on("user-message", (msg) => {
      if (msg && roomNumber) {
        textsTemp.push({ msg, roomNumber });
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

      // console.log(e.target.elements.msg.value);
      const msg = e.target.elements.msg.value;

      if (msg.length > 0) {
        socket.emit("chat-user", { roomNumber, msg });
      } else {
        console.log(`the message to short`);
      }

      e.target.reset();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h2>RoomNumber {roomNumber}</h2>
      <form onSubmit={handleForm}>
        <input type="text" name="msg" placeholder="Enter message" />
        <button type="submit">Send</button>
      </form>

      <ul>
        {massages
          .filter((text) => text.roomNumber === roomNumber)
          .map((text, index) => {
            return <li key={index}>{text.msg}</li>;
          })}
      </ul>
    </div>
  );
};

RoomNumber.propTypes = {};

export default RoomNumber;
