import { cookie } from "utils/auth";
import React, { useEffect, useState, useRef } from "react";
import * as S from "./style";
import AlarmSvg from "assets/svg/alarm.svg";
import FaceSvg from "assets/svg/face.svg";
import MenuSvg from "assets/svg/menu.svg";
import HelfMenu from "components/helpmenu";
import Alarm from "components/alarm";
import Menu from "components/menu";

interface HeaderIconType {
  type: "help" | "alarm" | "menu";
}

const Header = () => {
  const [name, setName] = useState<string>("");
  const [helpModalOpen, setHelpModalOpen] = useState<boolean>(false);
  const [alarmModalOpen, setAlarmModalOpen] = useState<boolean>(false);
  const [menuModalOpen, setMenuModalOpen] = useState<boolean>(false);

  const helpModalRef = useRef<HTMLDivElement>(null);
  const alarmModalRef = useRef<HTMLDivElement>(null);
  const menuModalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setName(cookie.get("name"));
  }, []);

  const handleIconClick = (type: HeaderIconType["type"]) => {
    switch (type) {
      case "help":
        setHelpModalOpen(true);
        setAlarmModalOpen(false);
        setMenuModalOpen(false);
        break;
      case "alarm":
        setHelpModalOpen(false);
        setAlarmModalOpen(true);
        setMenuModalOpen(false);
        break;
      case "menu":
        setHelpModalOpen(false);
        setAlarmModalOpen(false);
        setMenuModalOpen(true);
        break;
      default:
        break;
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      helpModalRef.current &&
      !helpModalRef.current.contains(event.target as Node) &&
      helpModalOpen
    ) {
      setHelpModalOpen(false);
    }

    if (
      alarmModalRef.current &&
      !alarmModalRef.current.contains(event.target as Node) &&
      alarmModalOpen
    ) {
      setAlarmModalOpen(false);
    }

    if (
      menuModalRef.current &&
      !menuModalRef.current.contains(event.target as Node) &&
      menuModalOpen
    ) {
      setMenuModalOpen(false);
    }
  };

  const MenuOnClick = () => {
    setMenuModalOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [helpModalOpen, alarmModalOpen, menuModalOpen]);

  return (
    <>
      <S.HeaderWrap>
        <S.nameText>{name} 선생님</S.nameText>
        <S.HeaderIconWrap>
          <S.IconStyle
            src={FaceSvg}
            alt="아이콘"
            onClick={() => handleIconClick("help")}
          />
          <S.IconStyle
            src={AlarmSvg}
            alt="아이콘"
            onClick={() => handleIconClick("alarm")}
          />
          <S.IconStyle
            src={MenuSvg}
            alt="아이콘"
            onClick={() => handleIconClick("menu")}
          />
        </S.HeaderIconWrap>
      </S.HeaderWrap>
      {helpModalOpen && (
        <div ref={helpModalRef}>
          <HelfMenu />
        </div>
      )}
      {alarmModalOpen && (
        <div ref={alarmModalRef}>
          <Alarm />
        </div>
      )}
      {menuModalOpen && (
        <div ref={menuModalRef}>
          <Menu closeOnClick={MenuOnClick} />
        </div>
      )}
    </>
  );
};

export default Header;
