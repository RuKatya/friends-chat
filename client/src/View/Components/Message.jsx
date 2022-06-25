import { useEffect, useState } from "react";

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
  ];
  useEffect(() => {});

  return (
    <div className="room__context--messages__message">
      <span
        style={{
          fontWeight: "bold",
          color: `${colors[randomNum]}`,
        }}
      >
        {nameUser}
      </span>
      : {messageUser}
    </div>
  );
};

export default Message;
