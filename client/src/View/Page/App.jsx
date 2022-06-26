import { Link, Outlet } from "react-router-dom";
import Login from "../Components/Login";
import NameInput from "../Components/NameInput";
import { useNavigate } from "react-router-dom";

function App({ userName, setUserName }) {
  const navigate = useNavigate();
  return (
    <div className="app">
      {userName ? (
        navigate(`/1111`)
      ) : (
        <>
          <Login setUserName={setUserName} />
        </>
      )}
    </div>
  );
}

export default App;
