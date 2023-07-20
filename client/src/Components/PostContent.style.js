import { styled } from 'styled-components';
import { Grayscale } from '../color';

export const PostContainer = styled.section`
  width: 100%;
  max-height: ${({ type }) => (type === 'crewing' ? '480px' : '300px')};
  padding: 30px 10px 30px 30px;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  border-bottom: ${({ edit }) =>
    edit === 'true' ? 'none' : '1px solid #dbdbdb'};
`;

export const Author = styled.div`
  width: 100%;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const AuthorInfo = {
  Container: styled.div`
    display: flex;
    align-items: center;
  `,
  CreateAt: styled.div`
    font-size: 14px;
    font-weight: 400;
    color: ${Grayscale[60]};
    margin-left: 10px;
  `,
  LinkContainer: styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  Profile: styled.section`
    cursor: pointer;
    display: flex;
    align-items: center;

    > img {
      width: 32px;
      border-radius: 70%;
      object-fit: cover;
      aspect-ratio: 1/1;
    }
  `,
  AuthorName: styled.section`
    font-size: 18px;
    font-weight: 800;
    color: ${Grayscale[80]};
    margin-left: 12px;
    text-decoration: none;
    cursor: pointer;
  `,
};

export const Title = styled.div`
  font-size: 18px;
  color: #000;
  font-weight: 600;
  margin-bottom: 16px;
  margin-top: 34px;
`;

export const EditStyle = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    padding-right: 20px;
    align-items: center;
  `,
  CancelBtn: styled.button`
    font-size: 14px;
    color: #737373;
    border: 0;
    background-color: #fff;
    margin-right: 20px;
  `,
  Title: styled.input`
    width: 100%;
    margin-top: 40px;
    height: 30px;
    padding: 14px;
  `,

  Content: styled.textarea`
    width: 100%;
    margin-top: 16px;
    height: 80px;
    padding: 14px;
    resize: none;
  `,

  EditBtn: styled.button`
    width: 138px;
    height: 60px;
    font-size: 16px;
    margin-top: 16px;
    color: #fff;
    background-color: #222;
    border: 0;
    border-radius: 6px;
    cursor: pointer;
  `,
};
