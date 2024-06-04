import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Test from "./pages/test";
import Main from "pages/Main/index";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/test" element={<Test />} />
      <Route path="/main" element={<Main />} />
    </Routes>
  </BrowserRouter>
);
