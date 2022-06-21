import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import Auth from "../View/Page/Auth";
import RoomNumber from "../View/Page/RoomNumber";
import Layout from "./Layout";

const RoutesPage = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Layout />}>
          <Route index element={<Auth />} />
          <Route path="chats" element={<App />}>
            <Route path=":roomNumber" element={<RoomNumber />} />
          </Route>
        </Route> */}
        <Route path="/" element={<Layout />}>
          {/* <Route index element={<Auth />} /> */}
          <Route index element={<App />} />
          <Route path=":roomNumber" element={<RoomNumber />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesPage;
