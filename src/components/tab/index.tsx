import React, { useEffect, useRef } from 'react';
import { styled } from 'styled-components';
import { theme } from '@/styles/theme';

interface TabbarProps {
  selectedTab: string;
  onTabPress: (tab: string) => void;
}

const Tabbar: React.FC<TabbarProps> = ({ selectedTab, onTabPress }) => {
  const translateX = useRef(0);

  useEffect(() => {
    translateX.current = selectedTab === '외출' ? 0 : 135;
  }, [selectedTab]);

  console.log(translateX);

  return (
    <Container>
      <TabBackground>
        <Slider
          style={{
            transform: `translateX(${translateX.current}px)`,
          }}
        />
      </TabBackground>
      <TabStyle onClick={() => onTabPress('외출')}>외출</TabStyle>
      <TabStyle onClick={() => onTabPress('조기귀가')}>조기귀가</TabStyle>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 4px;
  position: relative;
`;

const TabBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 32px;
  overflow: hidden;
`;

const Slider = styled.div`
  width: 50%;
  height: 100%;
  border-radius: 32px;
  transition: transform 0.3s ease-in-out;
  background-color: ${theme.color.main[500]};
`;

const TabStyle = styled.button`
  width: 136px;
  padding: 8px 0;
  align-items: center;
  border-radius: 32px;
  z-index: 1;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: ${theme.color.normal.white};
`;

export default Tabbar;
