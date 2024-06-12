import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "pages/Main/index";
import { GlobalStyle } from "styles/theme";
import Login from "pages/login";
import NoticePage from "pages/notice";
import NoticeDetail from "pages/notice/detail.tsx";
import NoticeWrite from "pages/notice/write";
function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/main" element={<Main />} />
          <Route path="/notice" element={<NoticePage />} />
          <Route path="/notice/write" element={<NoticeWrite />} />
          <Route path="/notice/:id" element={<NoticeDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
