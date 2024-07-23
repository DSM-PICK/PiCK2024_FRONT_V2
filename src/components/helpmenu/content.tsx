import React from 'react';
import * as S from './style';

interface HelpContentProp {
  icon: React.ReactNode;
  content: string;
  onClick: () => void;
}

export const HelpContent = ({ icon, content, onClick }: HelpContentProp) => {
  return (
    <S.helpMenuContent onClick={onClick}>
      {icon}
      {content}
    </S.helpMenuContent>
  );
};

export default HelpContent;
