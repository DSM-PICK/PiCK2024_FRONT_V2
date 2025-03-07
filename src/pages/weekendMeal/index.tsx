import { useState } from 'react';
import { Button } from '@/components/Button';
import Dropdown from '@/components/dropdown';
import { Layout } from '@/components/layout';
import { GetAllMeals, GetClassWeekendMeal } from '@/apis/weekend-meals';
import { styled } from 'styled-components';
import { theme } from '@/styles/theme';
import WeekEndList from '@/components/list/weekendMeal';
import { ClassDownLoadExcel, DownLoad } from '@/apis/meal';
import { setStudentNum } from '@/utils/utils';
import { Class_numOption, GradeOption } from '@/utils/dropdown';
import { WeekendMealModal } from '@/components/modal/weekendmealModal';
import { BeatLoader } from 'react-spinners';

const WeekedMeal = () => {
  const { data: GetAllList, isLoading } = GetAllMeals();
  const { downloadExcel } = DownLoad();
  const [selectedGrade, setSelectedGrade] = useState<number>(5);
  const [selectedClass, setSelectedClass] = useState<number>(5);
  const [modal, setModal] = useState<boolean>(false);
  const { ClassDownloadExcel } = ClassDownLoadExcel(
    selectedGrade,
    selectedClass,
  );
  const { data: GetClassList } = GetClassWeekendMeal(
    selectedGrade,
    selectedClass,
  );

  const handleGradeChange = (selectedOption: number | string) => {
    if (selectedOption === 5) {
      setSelectedClass(5);
    } else if (selectedClass === 5) {
      setSelectedClass(1);
    }
    setSelectedGrade(Number(selectedOption));
  };

  const handleClassChange = (selectedOption: number | string) => {
    if (selectedOption === 5) {
      setSelectedGrade(5);
    } else if (selectedGrade === 5) {
      setSelectedGrade(1);
    }
    setSelectedClass(Number(selectedOption));
  };

  return (
    <Layout
      title="주말 급식 신청"
      now="주말 급식 신청"
      right={
        <>
          {selectedGrade === 5 && selectedClass === 5 ? (
            <>
              <Button onClick={() => setModal(true)} type="main" size="small">
                주말급식 기간 설정
              </Button>
              <Button onClick={downloadExcel} type="main" size="small">
                엑셀 출력하기
              </Button>
            </>
          ) : (
            <Button onClick={ClassDownloadExcel} type="main" size="small">
              반별 주말급식 출력하기
            </Button>
          )}
          <Dropdown
            options={GradeOption}
            value={selectedGrade}
            changeHandler={handleGradeChange}
          />
          <Dropdown
            options={Class_numOption}
            value={selectedClass}
            changeHandler={handleClassChange}
          />
        </>
      }
    >
      {selectedGrade === 5 && selectedClass == 5 ? (
        <>
          <NoticeWrap>
            <p>번호</p> <p>이름</p>
            <p>상태</p>
          </NoticeWrap>
          <div>
            {isLoading && <BeatLoader style={{ display: 'flex' }} />}
            {GetAllList?.map((item) => (
              <>
                <WeekEndList
                  grade={false}
                  id={item.id}
                  number={setStudentNum(item)}
                  name={item.user_name}
                  status={item.status}
                />
              </>
            ))}
          </div>
        </>
      ) : (
        <ClassProp>
          <Wrap>
            <div>
              <ResTitle>
                신청({selectedGrade}-{selectedClass})
              </ResTitle>
            </div>
            {GetClassList?.map(
              (item) =>
                item.status === 'OK' && (
                  <WeekEndList
                    grade
                    id={item.id}
                    number={setStudentNum(item)}
                    name={item.user_name}
                    status={item.status}
                  />
                ),
            )}
          </Wrap>
          <Wrap>
            <div>
              <ResTitle>
                미신청({selectedGrade}-{selectedClass})
              </ResTitle>
            </div>
            {GetClassList?.map(
              (item) =>
                item.status === 'NO' && (
                  <WeekEndList
                    grade
                    id={item.id}
                    number={setStudentNum(item)}
                    name={item.user_name}
                    status={item.status}
                  />
                ),
            )}
          </Wrap>
        </ClassProp>
      )}
      {modal && (
        <WeekendMealModal
          setState={setModal}
          title="주말 급식 신청을 받을 기간을 설정해주세요"
          subTitle="설정 된 기간에만 신청할 수 있습니다."
          onCancel={() => setModal(false)}
        />
      )}
    </Layout>
  );
};

export default WeekedMeal;

const NoticeWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20%;
  cursor: pointer;
  background-color: ${theme.color.gray[50]};
  font-size: ${theme.font.heading[4].size};
  font-weight: ${theme.font.heading[4].fontweight};
`;

const ResTitle = styled.p`
  font-size: ${theme.font.heading[2].size};
  font-weight: ${theme.font.heading[2].fontweight};
`;

const ClassProp = styled.div`
  display: flex;
  justify-content: space-evenly;
  gap: 100px;
`;

const Wrap = styled.div`
  width: 100%;
`;
