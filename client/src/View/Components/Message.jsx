import React, { useEffect } from "react";
import { useState } from "react";
// import { useState } from "react";

const Message = ({ nameUser, messageUser }) => {
  const [randomNum, setRandomNum] = useState(Math.round(Math.random() * 6));

  const colors = [
    "rgb(255, 51, 51)",
    "rgb(224, 114, 18)",
    "rgb(179, 146, 13)",
    "rgb(21, 145, 12)",
    "rgb(13, 122, 122)",
    "rgb(13, 37, 122)",
    "rgb(71, 13, 122)",
    // "rgb(136, 211, 255)",
    // "rgb(255, 197, 149)",
    // "rgb(155, 253, 219)",
    // "rgb(236, 184, 254)",
    // "rgb(254, 184, 184)",
    // "rgb(253, 246, 155)",
    // "rgb(155, 163, 253)",
  ];
  //   const bla = document.querySelector(".room__context--messages__message");
  useEffect(() => {
    // bla?.scrollIntoView({ behavior: "smooth" });
    // window.addEventListener(()=>{
    // const message =
    // window.scrollTo(0, document.body.scrollHeight);
    // })
  });
  return (
    <div
      className="room__context--messages__message"
      //   style={{ backgroundColor: `${colors[randomNum]}` }}
    >
      <span
        style={{
          fontWeight: "bold",
          color: `${colors[randomNum]}`,
          //   backgroundColor: "",
        }}
      >
        {nameUser}
      </span>
      : {messageUser}
    </div>
  );
};

export default Message;
