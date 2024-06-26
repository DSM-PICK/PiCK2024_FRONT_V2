import React, { useState, useRef, useEffect } from "react";
import arrow from "assets/svg/dropdownImg.svg";
import downarrow from "assets/svg/dropdownArrowImg2.svg";
import * as S from "./style";

interface Option {
  value: number;
  label: string;
}

interface DropProps {
  type: "floor" | "grade" | "class" | "club" | "all";
  onChange?: (selectedOption: number) => void;
}

const Dropdown: React.FC<DropProps> = ({ type, onChange }) => {
  const [selectedGradeOption, setSelectedGradeOption] = useState<number>(5);
  const [selectedClassOption, setSelectedClassOption] = useState<number>(5);
  const [selectedFloorOption, setSelectedFloorOption] = useState<number>(5);
  // const [selectedClubOption, setSelectedClubOption] =
  //   useState<string>("세미나실 2-1(대동여지도)");
  const [selectedAllOption, setSelectedAllOption] = useState<number>(1);
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option: number) => {
    if (onChange) {
      onChange(option);
      switch (type) {
        case "grade":
          setSelectedGradeOption(option);
          break;
        case "class":
          setSelectedClassOption(option);
          break;
        case "floor":
          setSelectedFloorOption(option);
          break;
        // case "club":
        //   setSelectedClubOption(option.label);
        //   break;
        case "all":
          setSelectedAllOption(option);
          break;
        default:
          break;
      }
    }
    setIsDropdownVisible(false);
  };

  const title = () => {
    switch (type) {
      case "grade":
        return `${selectedGradeOption}학년`;

      case "class":
        return `${selectedClassOption}반`;

      case "floor": {
        if (selectedFloorOption === 5) {
          return `전체`;
        } else {
          return `${selectedFloorOption}층`;
        }
      }

      case "all":
        return selectedAllOption === 5 ? `전체` : `${selectedAllOption}학년`;

      // case "club":
      //   return selectedClubOption;
      default:
        return "";
    }
  };

  const options =
    type === "floor"
      ? [
          { value: 2, label: "2층" },
          { value: 3, label: "3층" },
          { value: 4, label: "4층" },
          { value: 5, label: "전체" },
        ]
      : type === "grade"
      ? [
          { value: 1, label: "1학년" },
          { value: 2, label: "2학년" },
          { value: 3, label: "3학년" },
        ]
      : type === "class"
      ? [
          { value: 1, label: "1반" },
          { value: 2, label: "2반" },
          { value: 3, label: "3반" },
          { value: 4, label: "4반" },
        ]
      : // type === "club"
      // ? [
      //     { value: "대동여지도", label: "세미나실 2-1(대동여지도)" },
      //     { value: "DMS", label: "세미나실 2-2(DMS)" },
      //     { value: "gram", label: "세미나실 2-3(gram)" },
      //     { value: "Lift", label: "소개2실(Lift)" },
      //     { value: "Log", label: "세미나실 3-1(Log)" },
      //     { value: "은하", label: "세미나실 3-2(은하)" },
      //     { value: "PiCK", label: "세미나실 3-3(PiCK)" },
      //     { value: "어게인", label: "보안 1실(어게인)" },
      //     { value: "info", label: "보안 2실(info)" },
      //     { value: "TeamQSS", label: "세미나실 4-1(TeamQSS)" },
      //     { value: "NoNamed", label: "세미나실 4-2(NoNamed)" },
      //     { value: "Modeep", label: "세미나실 4-3(Modeep)" },
      //     { value: "자습", label: "자습" },
      //   ]
      // :
      type === "all"
      ? [
          { value: 1, label: "1학년" },
          { value: 2, label: "2학년" },
          { value: 3, label: "3학년" },
          { value: 5, label: "전체" },
        ]
      : [];

  return (
    <S.DropdownTitle ref={dropdownRef} onClick={toggleDropdown}>
      {title()}
      <img
        src={isDropdownVisible ? `${downarrow}` : `${arrow}`}
        alt="arrow"
        width={16}
        height={16}
      />
      {isDropdownVisible && (
        <S.DropdownClickContainer isActive>
          {options.map((option) => (
            <S.DropdownClick
              isActive
              key={option.value.toString()}
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </S.DropdownClick>
          ))}
        </S.DropdownClickContainer>
      )}
    </S.DropdownTitle>
  );
};

export default Dropdown;
