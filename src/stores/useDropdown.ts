import { create } from "zustand";
import { persist } from "zustand/middleware";

interface dropdownInfo {
  dropdownInfo: {
    grade: number;
    class_num: number;
  } | null;
  setDropdownInfo: (info: {
    grade: number;
    class_num: number;
  }) => void;
}

const useDropdownInformation = create(
  persist<dropdownInfo>(
    (set) => ({
      dropdownInfo: null,
      setDropdownInfo: (info) => set({ dropdownInfo: info }),
    }),
    {
      name: "dropdownInfo",
      getStorage: () => localStorage,
    }
  )
);

export default useDropdownInformation;
