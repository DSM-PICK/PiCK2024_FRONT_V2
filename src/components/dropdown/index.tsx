import { useEffect, useRef, useState } from "react";
import * as S from "./style";
import dropdownArrowImg from "assets/svg/dropdownImg.svg";

interface DropdownProps {
  type: "floor" | "grade" | "class";
}

const Dropdown = ({ type }: DropdownProps) => {
  const [dropdownArray, setDropdownArray] = useState<string[]>([]);
  const [dropdownImg, setDropdownImg] = useState<string>(dropdownArrowImg);
  const [dropdownTitle, setDropdownTitle] = useState<string>();
  const [isActive, setIsActive] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const floorArray = ["1층", "2층", "3층", "4층", "5층"];
  const gradeArray = ["1학년", "2학년", "3학년"];
  const classArray = ["1반", "2반", "3반", "4반"];

  useEffect(() => {
    switch (type) {
      case "floor":
        setDropdownArray(floorArray);
        setDropdownTitle(floorArray[0]);
        break;
      case "grade":
        setDropdownArray(gradeArray);
        setDropdownTitle(gradeArray[0]);
        break;
      case "class":
        setDropdownArray(classArray);
        setDropdownTitle(classArray[0]);
        break;
    }
  }, []);

  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (
        isActive &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsActive(false);
      }
    };

    document.addEventListener("mousedown", clickOutside);

    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [isActive]);

  const handleDropdown = () => {
    setIsActive(!isActive);
    setDropdownImg(dropdownArrowImg);
  };

  return (
    <S.PositionDiv>
      <S.DropdownTitle onClick={handleDropdown} ref={dropdownRef}>
        {dropdownTitle}
        <img src={dropdownImg} alt="" />
      </S.DropdownTitle>
      <S.DropdownClickContainer isActive={isActive} ref={dropdownRef}>
        {dropdownArray.map((element, index) => (
          <S.DropdownClick
            key={index}
            isActive={isActive}
            onClick={() => {
              setDropdownTitle(element);
              setIsActive(false);
            }}
          >
            {element}
          </S.DropdownClick>
        ))}
      </S.DropdownClickContainer>
    </S.PositionDiv>
  );
};

export default Dropdown;
