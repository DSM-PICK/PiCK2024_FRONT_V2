import * as S from './style';
import classMoveImg from '@/assets/svg/classroomMovementImg.svg';
import academicCalendar from '@/assets/svg/academicCalendar.svg';
import afterSchool from '@/assets/svg/afterSchool.svg';
import changeTeacher from '@/assets/svg/changeTeacher.svg';
import weekendMeals from '@/assets/svg/weekendMeals.svg';
import timetableChange from '@/assets/svg/timetableChange.svg';
import outingHistory from '@/assets/svg/outingHistory.svg';
import outingAllow from '@/assets/svg/outingAllow.svg';
import notification from '@/assets/svg/notification.svg';
import goingOutList from '@/assets/svg/goingOutList.svg';
import clubManagement from '@/assets/svg/clubManagement.svg';
import classAttendance from '@/assets/svg/classAttendance.svg';
import selfStudyImg from '@/assets/svg/selfStudy.svg';

interface MainRouterButtonType {
  img: string;
  text: string;
  router: string;
}
const MainRouterButton = () => {
  const mainRouterButtonArray: MainRouterButtonType[] = [
    {
      img: outingAllow,
      text: '외출 수락',
      router: '/outAccept',
    },
    {
      img: goingOutList,
      text: '외출자 목록',
      router: '/outList',
    },
    {
      img: outingHistory,
      text: '이전 외출 기록',
      router: '/previousList',
    },
    {
      img: classMoveImg,
      text: '교실 이동 수락',
      router: '/classMove',
    },
    {
      img: weekendMeals,
      text: '주말 급식 신청',
      router: '/weekendMeal',
    },
    {
      img: notification,
      text: '공지',
      router: '/notice',
    },
    {
      img: classAttendance,
      text: '학급 관리',
      router: '/classManage',
    },
    {
      img: clubManagement,
      text: '전공동아리 출결',
      router: '/club',
    },
    {
      img: changeTeacher,
      text: '자습감독',
      router: '/self-study',
    },
    {
      img: selfStudyImg,
      text: '자습시간 출결',
      router: '/attendanceCheck',
    },
    {
      img: academicCalendar,
      text: '학사일정',
      router: '/schedule',
    },
    // {
    //   img: timetableChange,
    //   text: '시간표',
    //   router: '/timetable',
    // },
  ];

  return (
    <S.MainRouterFlexbox>
      {mainRouterButtonArray.map((element, index) => {
        const { img, text, router } = element;
        return (
          <S.MainRouterButtonContainer to={router} key={index}>
            <S.MainRouterImgContainer>
              <img src={img} alt="" />
            </S.MainRouterImgContainer>
            <S.MainRouterText>{text}</S.MainRouterText>
          </S.MainRouterButtonContainer>
        );
      })}
    </S.MainRouterFlexbox>
  );
};

export default MainRouterButton;
