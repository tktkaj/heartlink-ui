import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'react-toastify/dist/ReactToastify.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainPage from './main/MainPage';
import Search from './search/Search';
import ChatRoom from './dm/ChatRoom';
import MyPage from './mypage/MyPage';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <MainPage /> },
      { path: '/home', element: <MainPage /> },
      { path: '/search', element: <Search /> },
      { path: '/couple', element: <MainPage /> },
      { path: '/dm/:id', element: <ChatRoom /> },
      { path: '/mypage', element: <MyPage /> },
    ],
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
