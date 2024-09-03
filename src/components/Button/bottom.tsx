import { styled } from 'styled-components';
import { Button } from '.';

interface BottomProp {
  firstOnclick: () => void;
  firstType: 'main' | 'error' | 'black' | 'error2';
  firstSize: 'small' | 'standard';
  firstContent: string;
  second?: boolean;
  secondOnclick?: () => void;
  secondType?: 'main' | 'error' | 'black' | 'error2';
  secondSize?: 'small' | 'standard';
  disabled?: boolean;
  secondContent?: string;
}

const BottomButtonWrap = ({
  firstOnclick,
  firstType,
  firstSize,
  firstContent,
  disabled,
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
        disabled={disabled}
      >
        {firstContent}
      </Button>
      {second && secondSize && secondType && secondOnclick && (
        <Button
          onClick={secondOnclick}
          type={secondType}
          disabled={disabled}
          size={secondSize}
        >
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
  left: 0;
  width: 100%;
  bottom: 0;
  padding: 60px 240px;
  justify-content: end;
  gap: 32px;
  background-image: linear-gradient(
    0deg,
    rgb(255, 255, 255) 20%,
    transparent 400%
  );
`;
