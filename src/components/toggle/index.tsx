import { theme } from '@/styles/theme';
import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

interface ToggleProps {
  onChange: (menu: 'application' | 'early-return') => void;
}

export const Toggle = ({ onChange }: ToggleProps) => {
  const [currentMenu, setCurrentMenu] = useState<
    'application' | 'early-return'
  >('application');
  const [xpos, setXpos] = useState<number | undefined>(0);
  const applicationBtn = useRef<HTMLButtonElement | null>(null);
  const earlyReturnBtn = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (currentMenu === 'application' && applicationBtn.current) {
      setXpos(applicationBtn.current.offsetLeft);
    } else if (currentMenu === 'early-return' && earlyReturnBtn.current) {
      setXpos(earlyReturnBtn.current.offsetLeft);
    }
    onChange(currentMenu);
  }, [currentMenu, onChange]);

  return (
    <MenuContainer>
      <UnderLine left={xpos} />
      <MenuWrapper>
        <StyledBtn
          name="application"
          ref={applicationBtn}
          isActive={currentMenu === 'application'}
          onClick={() => setCurrentMenu('application')}
        >
          외출
        </StyledBtn>
        <StyledBtn
          name="early-return"
          ref={earlyReturnBtn}
          isActive={currentMenu === 'early-return'}
          onClick={() => setCurrentMenu('early-return')}
        >
          조기귀가
        </StyledBtn>
      </MenuWrapper>
    </MenuContainer>
  );
};

const MenuContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 43px;
`;

const MenuWrapper = styled.div`
  display: flex;
  height: 43px;
`;

const StyledBtn = styled.button<{ isActive: boolean }>`
  background: none;
  border: none;
  padding: 10px;
  cursor: pointer;
  width: 136px;
  height: 43px;
  font-size: ${theme.font.body[2].size};
  font-weight: ${theme.font.body[2].fontweight};
  color: ${(props) =>
    props.isActive ? theme.color.normal.white : theme.color.normal.black};
  z-index: 1;
`;

const UnderLine = styled.div<{ left?: number }>`
  width: 136px;
  height: 43px;
  border-radius: 32px;
  background-color: ${theme.color.main[500]};
  position: absolute;
  left: ${(props) => (props.left ?? 0) + 'px'};
  transition: left 0.5s ease;
  z-index: 0;
`;
