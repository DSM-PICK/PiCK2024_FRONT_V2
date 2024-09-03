import Input from '@/components/input';
import { Textarea } from '@/components/input/textarea';
import { Layout } from '@/components/layout';
import { theme } from '@/styles/theme';
import { useState } from 'react';
import styled from 'styled-components';
import BugReportImg from '@/assets/svg/BugReportIcon.svg';
import ImgModal from '@/components/modal/imgModal';
import { BugImg, BugPost } from '@/apis/bug';
import BottomButtonWrap, { BottomButton } from '@/components/Button/bottom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface BugProp {
  title: string;
  content: string;
  file_name: string[];
}

const BugReport = () => {
  const [data, setData] = useState<BugProp>({
    title: '',
    content: '',
    file_name: [],
  });
  const [images, setImages] = useState<File[]>([]);
  const [modal, setModal] = useState<boolean>(false);
  const { mutate: BugImgMutate } = BugImg();
  const { mutate: BugPostMutate } = BugPost();

  const router = useNavigate();
  const disabled = data.content === '' || data.title === '';

  const handleImgUpload = async (images: File[]) => {
    try {
      const response = await BugImgMutate(
        { file: images },
        {
          onSuccess: (data) => {
            setData((prevData) => ({
              ...prevData,
              file_name: data,
            }));
          },
        },
      );

      console.log('Uploaded:', response);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  const Bug = async () => {
    try {
      await BugPostMutate(data);
    } catch (error) {
      toast.error('버그 제보에 실패했습니다.');
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleRemoveImage = (index: number) => {
    setData((prevData) => ({
      ...prevData,
      file_name: prevData.file_name.filter((_, i) => i !== index),
    }));
  };

  return (
    <Layout now="버그 제보하기" title="버그 제보하기">
      <Input
        name="title"
        widthtype="long"
        value={data.title}
        onChange={handleChange}
        label="*어디서 버그가 발생했나요?"
        placeholder="ㅇㅖ)ㅁㅔㅇㅣㄴㅍㅔㅇㅣㅈㅣ"
      />
      <Textarea
        name="content"
        value={data.content}
        onChange={handleChange}
        label="*버그에 대해 설명해주세요"
        placeholder="구체적으로 작성"
      />
      <div>
        <p>버그 사진을 첨부해주세요</p>
        <Img
          htmlFor="file-input"
          onClick={() => {
            setModal(!modal);
          }}
        >
          <img src={BugReportImg} alt="bug report icon" />
          <p>사진을 첨부해주세요</p>
        </Img>
      </div>
      <ImgModal
        onClick={handleImgUpload}
        onClose={() => {
          setModal(!modal);
        }}
        isOpen={modal}
      />
      <Imgcontainer>
        {data.file_name.map((item, index) => (
          <ImgWrap key={index}>
            <ImgD
              src={`${import.meta.env.VITE_PUBLIC_FILE_APP}${item}`}
              alt={`Uploaded ${index}`}
            />
            <Button onClick={() => handleRemoveImage(index)}>&times;</Button>
          </ImgWrap>
        ))}
      </Imgcontainer>
      <BottomButtonWrap
        firstContent="버그 제보"
        firstOnclick={Bug}
        firstSize="small"
        firstType="main"
        disabled={disabled}
      />
    </Layout>
  );
};

export default BugReport;

const ImgWrap = styled.div`
  position: relative;
`;

const Button = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  white-space: nowrap;
  background-color: ${theme.color.normal.black};
  opacity: 0.5;
  border-radius: 50%;
  padding: 8px 4px;
`;

const ImgD = styled.img`
  min-width: 100%;
  min-height: 100%;
  border-radius: 8px;
`;

const Imgcontainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
`;

const Img = styled.label`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  padding: 32px;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: max-content;
  border-radius: 6px;
  background-color: ${theme.color.gray[50]};
  color: ${theme.color.gray[600]};
`;
