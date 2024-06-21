import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "pages/Main/index";
import { GlobalStyle } from "styles/theme";
import Login from "pages/login";
import NoticePage from "pages/notice";
import NoticeDetail from "pages/notice/detail";
import NoticeWrite from "pages/notice/write";
import OutAccept from "pages/outAccept";
import Header from "components/header";
import Menu from "components/menu";
import OutList from "pages/outList";

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
          <Route path="/outAccept" element={<OutAccept />} />
          <Route path="/outList" element={<OutList />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
