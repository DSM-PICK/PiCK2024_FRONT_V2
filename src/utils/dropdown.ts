export const GradeOption = [
  { label: '전체', value: 5 },
  { label: '1학년', value: 1 },
  { label: '2학년', value: 2 },
  { label: '3학년', value: 3 },
];
export const Class_numOption = [
  { label: '전체', value: 5 },
  { label: '1반', value: 1 },
  { label: '2반', value: 2 },
  { label: '3반', value: 3 },
  { label: '4반', value: 4 },
];
export const FloorOption = [
  { label: '2층', value: 2 },
  { label: '3층', value: 3 },
  { label: '4층', value: 4 },
  { label: '전체', value: 5 },
];

export interface Option {
  value: number;
  label: string | number;
}
