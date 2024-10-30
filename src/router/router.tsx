import { createBrowserRouter } from 'react-router-dom';
import RequestClass from '@/pages/RequestClass';
import ClassManage from '@/pages/classManage';
import MoveClass from '@/pages/moveClass';
import NoticePage from '@/pages/notice';
import NoticeDetail from '@/pages/notice/detail';
import NoticeWrite from '@/pages/notice/write';
import OutAccept from '@/pages/outAccept';
import OutList from '@/pages/outList';
import PreviousList from '@/pages/previousList/index';
import WeekedMeal from '@/pages/weekendMeal';
import ChangePassword from '@/pages/changePassword';
import PreviousDetail from '@/pages/previousList/detail';
import SelfStudy from '@/pages/self-study';
import Schedule from '@/pages/schedule';
import NotFound from '@/pages/404Page';
import BugReport from '@/pages/bugReport';
import { TimeTable } from '@/pages/titmetable';
import { SelfStudyCheck } from '@/pages/selfStudyCheck';
import Main from '@/pages/Main';
import Login from '@/pages/login';

export const Router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        path: 'main',
        element: <Main />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: '*',
        element: <OutAccept />,
      },
      {
        path: 'notice',
        children: [
          {
            path: '',
            element: <NoticePage />,
          },
          {
            path: 'write',
            element: <NoticeWrite />,
          },
          {
            path: ':detail',
            element: <NoticeDetail />,
          },
        ],
      },
      {
        path: 'weekendMeal',
        element: <WeekedMeal />,
      },
      {
        path: 'outAccept',
        element: <OutAccept />,
      },
      {
        path: 'outList',
        element: <OutList />,
      },
      {
        path: 'classMove',
        children: [
          {
            path: 'accpet',
            element: <MoveClass />,
          },
          {
            path: '',
            element: <RequestClass />,
          },
        ],
      },
      {
        path: 'classManage',
        element: <ClassManage />,
      },
      {
        path: 'passwordChange',
        element: <ChangePassword />,
      },
      {
        path: 'self-study',
        element: <SelfStudy />,
      },
      {
        path: 'previousList',
        children: [
          {
            path: '',
            element: <PreviousList />,
          },
          {
            path: ':detail',
            element: <PreviousDetail />,
          },
        ],
      },
      {
        path: 'schedule',
        element: <Schedule />,
      },
      {
        path: 'bugReport',
        element: <BugReport />,
      },
      {
        path: 'timetable',
        element: <TimeTable />,
      },
      {
        path: 'attendanceCheck',
        element: <SelfStudyCheck />,
      },
    ],
  },
]);
