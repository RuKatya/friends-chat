import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../../index";
import { useNavigate } from "react-router-dom";
import Message from "../Components/Message";
import { useRef } from "react";

let textsTemp = [];

const RoomNumber = ({ userName }) => {
  const [massages, setMassages] = useState([]);
  const [userNameGet, setUserNameGet] = useState();
  const [amountOfUsers, setAmountOfUsers] = useState();
  const [userList, setUserList] = useState();
  const [up, setUp] = useState(2);
  const element = useRef(null);

  let { roomNumber } = useParams();

  let navigate = useNavigate();

  console.log(userName);
  useEffect(() => {
    if (roomNumber) {
      socket.emit("user-join", { roomNumber, userName });
    }

    // socket.on("user-get-in", (userName) => {
    //   // console.log(`user get in ${name}`);
    //   setUserNameGet(userName);
    // });

    // socket.on("users-amount", (countOfUsers) => {
    //   // console.log(`amount users ${countOfUsers}`);
    //   setAmountOfUsers(countOfUsers);
    // });

    socket.on("user-message", ({ msg, userName }) => {
      // console.log(msg);
      // console.log(userName);
      if (msg && roomNumber) {
        textsTemp.push({ msg, roomNumber, userName });
        setMassages(textsTemp);
        setUp(Math.random());
      }
    });

    socket.on("user-list", (connectedUsers) => {
      // console.log(connectedUsers);
      setUserList(connectedUsers);
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

  // console.log(userList);

  function handleForm(e) {
    try {
      e.preventDefault();

      let msg = e.target.elements.msg.value;

      if (userName) {
        if (msg.length > 0) {
          socket.emit("chat-user", { roomNumber, msg, userName });
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

  return (
    <>
      {userName ? (
        <div className="room">
          <h2 className="room__header">
            Room: {roomNumber} {/* | count of Users:{" "} */}
            {/* <div>{userList ? <> | {amountOfUsers}</> : <>0</>}</div> */}
          </h2>

          <div className="room__context">
            {/* <ul className="room__context--userList">
              {userList ? (
                <>
                  {userList.map((user) => {
                    return <li>{user}</li>;
                  })}
                </>
              ) : (
                <>{null}</>
              )}
            </ul> */}

            <div>
              {userNameGet ? (
                <div className="room__context--userConnect">
                  User {userNameGet} is here
                </div>
              ) : null}

              <div className="room__context--messages" ref={element}>
                {massages
                  .filter((text) => text.roomNumber === roomNumber)
                  .reverse()
                  .map((text, index) => {
                    return (
                      <Message
                        nameUser={text.userName}
                        messageUser={text.msg}
                        key={index}
                      />
                    );
                  })}
                {/* <span ref={element}></span> */}
              </div>

              <form onSubmit={handleForm} className="room__context--form">
                <textarea name="msg" placeholder="Enter message"></textarea>
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
// console.log(element.current?.clientHeight);

// if (window.close) {
//   // console.log(`da`);
//   navigate(`/`);
// }

// if (window.close) {
//   // console.log(`da`);
//   navigate(`/`);
// }
// if (window.onunload) {
//   console.log("bla");
// }
// navigate(`/`);

// socket.emit("user-leave", { roomNumber, name });
// socket.off("user-message");,

//   if (window.closed) {
//     socket.emit("user-leave", { roomNumber, name });
//     socket.off("user-message");
//   }

// message?.scrollIntoView({ behavior: "smooth" });
// element.scrollTo(0, element.current?.clientHeight);
// element.current?.scrollIntoView({ behavior: "smooth" });

// element.current?.scrollTop = element.current?.clientHeight;

// console.log(massages);

// useEffect(() => {
//   element.current.scrollIntoView({ behavior: "smooth" });
// }, [massages]);

// console.log(element.current?.clientHeight);
// element.addEventListener('scroll')
