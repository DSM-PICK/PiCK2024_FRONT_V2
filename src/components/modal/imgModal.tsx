import { theme } from '@/styles/theme';
import { useRef, useState } from 'react';
import { styled } from 'styled-components';
import { Button } from '@/components/Button/index';

interface ImgModalProp {
  isOpen: boolean;
  onClose: () => void;
  onClick: (images: File[]) => void;
}

const ImgModal = ({ isOpen, onClick, onClose }: ImgModalProp) => {
  const [dragActive, setDragActive] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const pasteDivRef = useRef<HTMLDivElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      setImages((prevImages) => [...prevImages, ...files]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setImages((prevImages) => [...prevImages, ...files]);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const items = Array.from(e.clipboardData.items);
    const pastedFiles = items
      .filter((item) => item.kind === 'file' && item.type.startsWith('image/'))
      .map((item) => item.getAsFile())
      .filter((file): file is File => file !== null);

    if (pastedFiles.length > 0) {
      setImages((prevImages) => [...prevImages, ...pastedFiles]);
    }

    if (pasteDivRef.current) {
      pasteDivRef.current.innerHTML = '';
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const AddImg = () => {
    onClick(images);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ImgContainer>
      <Container>
        <ButtonContainer onClick={onClose}>&times;</ButtonContainer>
        <Label
          dragActive={dragActive}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          htmlFor="imgUpload"
        >
          <div style={{ fontSize: 24 }}>&#128247;</div>
          이미지를 끌어오거나 업로드 할 파일을 선택해 주세요
        </Label>
        <input
          id="imgUpload"
          type="file"
          multiple
          style={{ display: 'none' }}
          onChange={handleChange}
        />
        <BottomContainer>
          <Line />
          <OrText>또는</OrText>
        </BottomContainer>
        <ImgInput
          contentEditable="true"
          onPaste={handlePaste}
          className="border border-gray-300 rounded-lg w-full p-2 mb-4"
          placeholder="이미지를 붙여넣기 해주세요"
        />
        <ImgWrap>
          {images.map((image, index) => (
            <ImgContainerWrap key={index} className="relative">
              <Img
                src={URL.createObjectURL(image)}
                width={100}
                height={100}
                alt={`Uploaded ${index}`}
              />
              <DeleteButton onClick={() => handleRemoveImage(index)}>
                &times;
              </DeleteButton>
            </ImgContainerWrap>
          ))}
        </ImgWrap>
        <ButtonWrap>
          <Button onClick={onClose} type="main" size="small">
            취소
          </Button>
          <Button onClick={AddImg} type="main" size="small">
            추가
          </Button>
        </ButtonWrap>
      </Container>
    </ImgContainer>
  );
};

export default ImgModal;

const ImgContainerWrap = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
`;

const ButtonWrap = styled.div`
  display: flex;
  gap: 4px;
`;

const Img = styled.img`
  min-width: 100px;
  min-height: 100px;
`;

const ImgWrap = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  justify-content: space-between;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  white-space: normal;
  background-color: ${theme.color.normal.black};
  padding: 4px 8px;
  border-radius: 50%;
`;

const ImgInput = styled.input`
  border: 1px solid ${theme.color.gray[300]};
  border-radius: 8px;
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
`;

const OrText = styled.p`
  background-color: ${theme.color.normal.white};
  padding: 4px;
  position: absolute;
  top: -18px;
  left: 45%;
`;

const ImgContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0000008c;
  z-index: 50;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

const Line = styled.div`
  position: absolute;
  left: 0;
  top: 50%;
  width: 100%;
  height: 1px;
  background-color: ${theme.color.gray[300]};
`;

const BottomContainer = styled.div`
  width: 100%;
  position: relative;
  text-align: center;
`;

const Container = styled.div`
  background-color: ${theme.color.normal.white};
  border-radius: 8px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 20px;
`;

const ButtonContainer = styled.div`
  font-size: 24px;
`;

const Label = styled.label<{ dragActive: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ dragActive }) =>
    dragActive ? theme.color.gray[300] : theme.color.gray[100]};
  border: 2px dashed ${theme.color.gray[300]};
  border-radius: 8px;
  padding: 32px;
  cursor: pointer;
`;
