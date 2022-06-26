import Login from "../Components/Login";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function App({ userName, setUserName }) {
  console.log(userName);
  const navigate = useNavigate();

  useEffect(() => {
    if (userName) navigate("/1111");
  });

  return (
    <div className="app">
      {userName ? null : <Login setUserName={setUserName} />}
    </div>
  );
}

export default App;
