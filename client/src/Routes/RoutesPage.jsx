import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import RoomNumber from "../View/Page/RoomNumber";
import Layout from "./Layout";

const RoutesPage = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path=":roomNumber" element={<RoomNumber />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesPage;
