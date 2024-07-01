import Login from "@/pages/Login/page";
import Main from "@/pages/Main";
import NoticePage from "@/pages/notice";
import NoticeDetail from "@/pages/notice/detail";
import NoticeWrite from "@/pages/notice/write";
import OutAccept from "@/pages/outAccept";
import WeekedMeal from "@/pages/weekendMeal";

import { createBrowserRouter } from "react-router-dom";

export const Router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "main",
        element: <Main />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "*",
        element: <OutAccept />,
      },
      {
        path: "notice",
        children: [
          {
            path: "",
            element: <NoticePage />,
          },
          {
            path: "write",
            element: <NoticeWrite />,
          },
          {
            path: ":detail",
            element: <NoticeDetail />,
          },
        ],
      },
      {
        path: "weekendMeal",
        element: <WeekedMeal />,
      },
    ],
  },
]);
