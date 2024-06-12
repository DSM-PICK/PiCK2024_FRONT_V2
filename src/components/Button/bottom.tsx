import { styled } from "styled-components";
import { Button } from ".";

interface BottomProp {
  firstOnclick: () => void;
  firstType: "main" | "error" | "black" | "error2";
  firstSize: "small" | "standard";
  second?: boolean;
  secondOnclick?: () => void;
  secondType?: "main" | "error" | "black" | "error2";
  secondSize?: "small" | "standard";
  firstDisabled: boolean;
}

const BottomButtonWrap = ({
  firstOnclick,
  firstType,
  firstSize,
  firstDisabled,
  second,
  secondOnclick,
  secondSize,
  secondType,
}: BottomProp) => {
  return (
    <BottomButton>
      <Button
        onClick={firstOnclick}
        type={firstType}
        size={firstSize}
        disabled={firstDisabled}
      >
        kk
      </Button>
      {second && secondSize && secondType && secondOnclick && (
        <Button onClick={secondOnclick} type={secondType} size={secondSize}>
          dd
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
  backdrop-filter: blur(10px);
`;
