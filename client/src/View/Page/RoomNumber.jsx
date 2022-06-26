import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../../index";
import { useNavigate } from "react-router-dom";
import Message from "../Components/Message";
import { useRef } from "react";
import HeaderOfChat from "../Components/HeaderOfChat";

let textsTemp = [];

const RoomNumber = ({ userName, setUserName }) => {
  const [massages, setMassages] = useState([]);
  const [up, setUp] = useState(2);
  const textElement = useRef(null);
  const [textMsg, setTextMsg] = useState();

  let { roomNumber } = useParams();

  let navigate = useNavigate();

  useEffect(() => {
    if (roomNumber) {
      socket.emit("user-join", { roomNumber, userName });
    }

    socket.on("user-message", ({ textMsg, userName }) => {
      if (textMsg && roomNumber) {
        textsTemp.push({ textMsg, roomNumber, userName });
        setMassages(textsTemp);
        setUp(Math.random());
      }
    });

    window.addEventListener("beforeunload", (e) => {
      e.preventDefault();
      e.returnValue = "";
    });

    return () => {
      socket.emit("user-leave", { roomNumber, userName });
      socket.off("user-message");
    };
  }, [roomNumber]);

  function handleForm(e) {
    try {
      e.preventDefault();

      console.log(textMsg);
      if (userName) {
        if (textMsg.length > 0) {
          socket.emit("chat-user", { roomNumber, textMsg, userName });
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

  function checkTextInput(e) {
    const text = textElement.current.value;

    e.preventDefault();

    setTextMsg(text);

    if (e.shiftKey === true && e.key === "Enter") {
      return;
    }
    if (e.key === "Enter") {
      if (textMsg.length > 0) {
        socket.emit("chat-user", {
          roomNumber,
          textMsg,
          userName,
        });
      } else {
        alert("message too short kapara");
      }

      e.target.offsetParent.reset();
    }
  }

  return (
    <>
      {userName ? (
        <div className="room">
          <HeaderOfChat roomNumber={roomNumber} setUserName={setUserName} />

          <div className="room__context">
            <div>
              <div className="room__context--messages">
                {massages
                  .filter((text) => text.roomNumber === roomNumber)
                  .reverse()
                  .map((text, index) => {
                    return (
                      <Message
                        nameUser={text.userName}
                        messageUser={text.textMsg}
                        key={index}
                      />
                    );
                  })}
              </div>

              <form onSubmit={handleForm} className="room__context--form">
                <textarea
                  name="msg"
                  placeholder="Enter message"
                  ref={textElement}
                  onKeyUp={checkTextInput}
                  // onKeyDown={(e) => {
                  //   // e.preventDefault();
                  //   console.log(e);

                  //   if (e.shiftKey === true && e.key === "Enter") {
                  //     return;
                  //   }
                  //   if (e.key === "Enter") {
                  //     if (textMsg.length > 0) {
                  //       socket.emit("chat-user", {
                  //         roomNumber,
                  //         textMsg,
                  //         userName,
                  //       });
                  //     } else {
                  //       alert("message too short kapara");
                  //     }

                  //     e.target.offsetParent.form.reset();
                  //   }
                  // }}
                ></textarea>
                <button type="submit">Send</button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <>{navigate(`/`)}</>
      )}
    </>
  );
};

RoomNumber.propTypes = {};

export default RoomNumber;
