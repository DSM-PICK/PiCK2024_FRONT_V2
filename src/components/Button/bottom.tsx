import { styled } from "styled-components";
import { Button } from ".";

interface BottomProp {
  firstOnclick: () => void;
  firstType: "main" | "error" | "black" | "error2";
  firstSize: "small" | "standard";
  firstContent: string;
  second?: boolean;
  secondOnclick?: () => void;
  secondType?: "main" | "error" | "black" | "error2";
  secondSize?: "small" | "standard";
  firstDisabled: boolean;
  secondContent?: string;
}

const BottomButtonWrap = ({
  firstOnclick,
  firstType,
  firstSize,
  firstContent,
  firstDisabled,
  second,
  secondOnclick,
  secondSize,
  secondType,
  secondContent,
}: BottomProp) => {
  return (
    <BottomButton>
      <Button
        onClick={firstOnclick}
        type={firstType}
        size={firstSize}
        disabled={firstDisabled}
      >
        {firstContent}
      </Button>
      {second && secondSize && secondType && secondOnclick && (
        <Button onClick={secondOnclick} type={secondType} size={secondSize}>
          {secondContent}
        </Button>
      )}
    </BottomButton>
  );
};

export default BottomButtonWrap;

export const BottomButton = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  bottom: 0;
  padding: 60px 240px;
  justify-content: end;
  gap: 32px;
  background: linear-gradient(
    174deg,
    rgba(255, 255, 255, 0) 5.76%,
    #fff 51.24%
  );
`;
