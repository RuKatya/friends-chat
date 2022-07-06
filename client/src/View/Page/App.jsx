import Login from "../Components/Login";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";

function App({ userName, setUserName }) {
  console.log(userName);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (userName) navigate("/1111");
  // });

  return (
    <div className="app">
      {userName ? (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Link to="/1111">1111</Link>
          <Link to="/2222">2222</Link>
          <Link to="/3333">3333</Link>
          <Link to="/4444">4444</Link>
        </div>
      ) : (
        <>
          <Login setUserName={setUserName} />
        </>
      )}
      {/* {userName ? null : <Login setUserName={setUserName} />} */}
    </div>
  );
}

export default App;
