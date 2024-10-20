import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "react-toastify/dist/ReactToastify.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./main/MainPage";
import Search from "./search/Search";
import ChatRoom from "./dm/ChatRoom";
import MyPage from "./mypage/MyPage";
import Login from "./login/Login";
import DmListBox from "./dm/DmListBox";
import Couple from "./Couple";
import NotFound from "./main/NotFound";
import LogoutAlert from "./alert/LogoutAlert";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <MainPage /> },
      { path: "/home", element: <MainPage /> },
      { path: "/search", element: <Search /> },
      { path: "/couple", element: <Couple /> },
      { path: "/dm", element: <ChatRoom /> },
      { path: "/mypage", element: <MyPage /> },
      { path: "/login", element: <Login /> },
      { path: "/dmlistbox", element: <DmListBox /> },
      { path: "/*", element: <NotFound /> },
      { path: "/alertLogout", element: <LogoutAlert /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
