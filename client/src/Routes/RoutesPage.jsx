import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../View/Page/App";
import RoomNumber from "../View/Page/RoomNumber";
import Layout from "./Layout";
import useLocalStorage from "../View/Hooks/useLocalStorage";

const RoutesPage = () => {
  const [userName, setUserName] = useLocalStorage("UserName");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={<App userName={userName} setUserName={setUserName} />}
          />
          <Route
            path=":roomNumber"
            element={
              <RoomNumber userName={userName} setUserName={setUserName} />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesPage;
