import React, { useEffect, useState, useRef } from 'react';
import * as S from './style';
import FaceSvg from '@/assets/svg/face.svg';
import MenuSvg from '@/assets/svg/menu.svg';
import HelfMenu from '@/components/helpmenu';
import Menu from '@/components/menu';
import { MyName } from '@/apis/admin';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { mutate: MynameMutate } = MyName();
  const [name, setName] = useState<string | null>(null);
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [menuModalOpen, setMenuModalOpen] = useState(false);
  const helpModalRef = useRef<HTMLDivElement>(null);
  const menuModalRef = useRef<HTMLDivElement>(null);
  const router = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem('name');

    if (storedName) {
      setName(storedName);
      checkAndNavigate(storedName);
    } else {
      SaveName();
    }
  }, []);

  const SaveName = () => {
    MynameMutate(null, {
      onSuccess: (data) => {
        if (data.name) {
          localStorage.setItem('name', data.name);
          localStorage.setItem('grade', JSON.stringify(data.grade || 0));
          localStorage.setItem('class_num', JSON.stringify(data.class_num || 0));
          setName(data.name);
          checkAndNavigate(data.name);
        }
      },
    });
  };

  const checkAndNavigate = (userName: string) => {
    if (userName === '영양사') {
      router('/weekendMeal');
    } else if (userName === '지킴이') {
      router('/outList');
    }
  };

  const handleIconClick = (type: 'help' | 'menu') => {
    setHelpModalOpen(type === 'help');
    setMenuModalOpen(type === 'menu');
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (helpModalOpen && helpModalRef.current && !helpModalRef.current.contains(event.target as Node)) {
      setHelpModalOpen(false);
    }
    if (menuModalOpen && menuModalRef.current && !menuModalRef.current.contains(event.target as Node)) {
      setMenuModalOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [helpModalOpen, menuModalOpen]);

  return (
    <>
      <S.HeaderWrap>
        <S.nameText>{name ? `${name} 선생님` : '불러오는 중...'}</S.nameText>
        <S.HeaderIconWrap>
          <S.IconStyle src={FaceSvg} alt="도움말 아이콘" onClick={() => handleIconClick('help')} />
          <S.IconStyle src={MenuSvg} alt="메뉴 아이콘" onClick={() => handleIconClick('menu')} />
        </S.HeaderIconWrap>
      </S.HeaderWrap>
      {helpModalOpen && (
        <div ref={helpModalRef}>
          <HelfMenu />
        </div>
      )}
      {menuModalOpen && (
        <div ref={menuModalRef}>
          <Menu closeOnClick={() => setMenuModalOpen(false)} />
        </div>
      )}
    </>
  );
};

export default Header;
