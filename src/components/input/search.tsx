import * as S from "./style";
import React, { useEffect, useRef, useState } from "react";
import search from "@/assets/svg/search.svg";
import { GetAllTeacher } from "@/apis/admin";

interface ChangeProps {
  text: string;
  name: string;
}

interface InputProp {
  label?: string;
  placeholder?: string;
  onChange: ({ text, name }: ChangeProps) => void;
  name?: string;
  value: string;
  password?: boolean;
  type: "Search" | "self";
}

const SearchInput = ({
  label,
  placeholder,
  name = "",
  onChange,
  value,
  type,
}: InputProp) => {
  const { data: teacherData } = GetAllTeacher();
  const [filteredTeachers, setFilteredTeachers] = useState<string[]>([]);
  const [list, setList] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onChange({ text: inputValue, name: e.target.name });

    if (type === "self") {
      setList(true);
      const filteredList = teacherData?.filter((teacher: string) =>
        teacher.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredTeachers(filteredList || [""]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setList(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <S.InputWrap ref={dropdownRef}>
      {label && <S.inputLabel>{label}</S.inputLabel>}
      <S.SearchWidth>
        {type === "Search" && <img src={search} alt="Icon" />}
        <S.SearchInput
          onClick={() => {
            setList(true);
          }}
          autoComplete="off"
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={handleChange}
        />
        {type === "self" && list && (
          <S.TeacherList>
            {filteredTeachers.map((teacher, index) => (
              <S.TeacherText
                key={index}
                onClick={() => {
                  onChange({ text: teacher, name: name });
                  setList(false);
                }}
              >
                {teacher}
              </S.TeacherText>
            ))}
          </S.TeacherList>
        )}
      </S.SearchWidth>
    </S.InputWrap>
  );
};

export default SearchInput;
