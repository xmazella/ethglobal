import React from "react";
import { styled } from "styled-components";

import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Header from "./components/Header.tsx";

const MainContainer = styled.div`
  background: #2e2e2e;
  padding: 20px 40px 0 40px;
  margin: 0;
`;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <MainContainer>
    <React.StrictMode>
      <Header />
      <RouterProvider router={router} />
    </React.StrictMode>
  </MainContainer>
);
