export const GradeOption = [
  { label: '1학년', value: 1 },
  { label: '2학년', value: 2 },
  { label: '3학년', value: 3 },
  { label: '전체', value: 5 },
];
export const Class_numOption = [
  { label: '1반', value: 1 },
  { label: '2반', value: 2 },
  { label: '3반', value: 3 },
  { label: '4반', value: 4 },
  { label: '전체', value: 5 },
];
export const FloorOption = [
  { label: '2층', value: 2 },
  { label: '3층', value: 3 },
  { label: '4층', value: 4 },
  { label: '전체', value: 5 },
];

export const NotAllFloorOption = [
  { label: '2층', value: 2 },
  { label: '3층', value: 3 },
  { label: '4층', value: 4 },
];

export const NotAllGradeOption = [
  { label: '1학년', value: 1 },
  { label: '2학년', value: 2 },
  { label: '3학년', value: 3 },
];

export const NotAllClassOption = [
  { label: '1반', value: 1 },
  { label: '2반', value: 2 },
  { label: '3반', value: 3 },
  { label: '4반', value: 4 },
];

export interface Option {
  value: number;
  label: string | number;
}

export const SecondClub = [
  { value: '대동여지도', label: '세미나실 2-1(대동여지도)' },
  { value: 'DMS', label: '세미나실 2-2(DMS)' },
  { value: 'gram', label: '세미나실 2-3(gram)' },
  { value: 'Liear', label: '세미나실 2-4(Liear)' },
  { value: 'gram-2', label: '3-2교실(gram)' },
  { value: 'EXIT', label: '소개1실(EXIT)' },
  { value: 'Lift', label: '소개2실(Lift)' },
  { value: 'DMS-2', label: '소개 3실(DMS 3학년)' },
  { value: '자습', label: '3-1교실(자습)' },
];

export const ThirdClub = [
  { value: 'Log', label: '세미나실 3-1(Log)' },
  { value: '은하', label: '세미나실 3-2(은하)' },
  { value: 'PiCK', label: '세미나실 3-3(PiCK)' },
  { value: 'DLC', label: '보안 1실(DLC)' },
  { value: 'info', label: '보안 2실(info)' },
  { value: '자습', label: '2-1교실(자습)' },
];
export const fourthClub = [
  { value: 'TeamQSS', label: '세미나실 4-1(TeamQSS)' },
  { value: 'NoNamed', label: '세미나실 4-2(NoNamed)' },
  { value: 'Modeep', label: '세미나실 4-3(Modeep)' },
  { value: '자습', label: '1-1교실(자습)' },
];

export const ClubList = [...SecondClub, ...ThirdClub, ...fourthClub];
