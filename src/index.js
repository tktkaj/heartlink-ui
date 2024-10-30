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
import Couple from "./couple/Couple";
import NotFound from "./main/NotFound";
import LogoutAlert from "./alert/LogoutAlert";
import CoupleAlert from "./alert/CoupleAlert";
import DeleteAlert from "./alert/DeleteAlert";
import CoupleConnect from "./couple/CoupleConnect";
import CoupleConnect2 from "./couple/CoupleConnect2";
import SignUp from "./join/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Login /> },
      { path: "/home", element: <MainPage /> },
      { path: "/search", element: <Search /> },
      { path: "/couple", element: <Couple /> },
      { path: "/dm/:userid", element: <DmListBox /> },
      { path: "/user/profile/:userId", element: <MyPage /> },
      { path: "/user/join", element: <SignUp /> },
      { path: "/login", element: <Login /> },
      { path: "/dm/:msgRoomId/detail", element: <ChatRoom /> },
      { path: "/*", element: <NotFound /> },
      { path: "/alertLogout", element: <LogoutAlert /> },
      { path: "/alertCouple", element: <CoupleAlert /> },
      { path: "/deleteAlert", element: <DeleteAlert /> },
      { path: "/coupleConnect", element: <CoupleConnect /> },
      { path: "/coupleConnect2", element: <CoupleConnect2 /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
