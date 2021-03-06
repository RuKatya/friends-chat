import React from 'react';
import ReactDOM from 'react-dom/client';
import RoutesPage from "./Routes/RoutesPage";
import './style/index.scss'
import { io } from "socket.io-client";
import 'bootstrap/dist/css/bootstrap.min.css'
export const socket = io();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RoutesPage />
  </React.StrictMode>
);

