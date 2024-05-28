import React from "react";
import * as S from "./style";

interface HelpContentProp {
  icon: React.ReactNode;
  content: string;
  onClick: () => void;
}

export const HelpContent = ({ icon, content }: HelpContentProp) => {
  return (
    <S.helpMenuContent>
      {icon}
      {content}
    </S.helpMenuContent>
  );
};

export default HelpContent;
