import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Test from "./pages/test";
import Main from "pages/Main/index";
import { GlobalStyle } from "styles/theme";
import Login from "pages/login";
import Header from "components/header";
import Menu from "components/menu";

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="d" element={<Header />} />
          <Route path="/test" element={<Test />} />
          <Route path="/login" element={<Login />} />
          <Route path="main" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
