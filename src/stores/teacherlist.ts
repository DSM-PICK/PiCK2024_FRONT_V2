import { create } from 'zustand';

interface HomeRoomState {
  teacher: string[];
  setTeacher: (teacherList: string[]) => void;
}

const useTeacherListInformation = create<HomeRoomState>((set) => ({
  teacher: [],
  setTeacher: (teacherList) => set({ teacher: teacherList }),
}));

export default useTeacherListInformation;
