import { styled } from 'styled-components';
import { Grayscale, Red, Color } from '../color';

export const Card = {
  Container: styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 184px;
    border: 1px solid ${Grayscale[20]};
    display: flex;
    cursor: pointer;
    border-radius: 12px;
    overflow: hidden;
    transition: all 0.2s ease;

    &:hover {
      border: 1px solid ${Color.Primary};
      box-shadow: 2px 4px 12px 0px rgba(0, 0, 0, 0.15);
      top: -2px;
      position: relative;

      > .recruitmentInfo {
        opacity: 1;
        display: block;
        width: 142px;
        flex: none;
        padding: 20px 14px;
        background-color: ${Grayscale[20]};
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
    }
  `,

  Img: styled.div`
    width: 178px;
    flex: none;
    padding: 20px;
    display: flex;
    align-items: center;
    > img {
      display: block;
      width: 100%;
      object-fit: cover;
      aspect-ratio: 1/1;
      border-radius: 6px;
    }
  `,

  Info: styled.div`
    flex-grow: 1;
    padding: 20px 20px 20px 20px;
    position: relative;
  `,
  Status: styled.div`
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${Color.Primary};
    font-size: 14px;
    font-weight: 600;
    border-radius: 0px 0px 6px 6px;
    position: absolute;
    height: 28px;
    top: 20px;
    right: 20px;

    &.end {
      color: ${Grayscale[40]};
    }
  `,
  Author: styled.div`
    height: 32px;
    display: flex;
    align-items: center;
  `,

  AuthorProfile: styled.img`
    border-radius: 70%;
    display: block;
    width: 24px;
    object-fit: cover;
    aspect-ratio: 1/1;
  `,

  AuthorName: styled.div`
    margin-left: 8px;
    font-size: 14px;
    font-weight: 600;
    color: ${Grayscale[80]};
  `,

  AuthorCreateAt: styled.div`
    margin-left: 6px;
    font-size: 14px;
    font-weight: 400;
    color: ${Grayscale[60]};
  `,

  Title: styled.div`
    margin-top: 18px;
    font-size: 16px;
    font-weight: 600;
    color: ${Grayscale[80]};
  `,

  Content: styled.div`
    font-size: 14px;
    font-weight: 400;
    margin-top: 12px;
    height: auto;
    max-height: 40px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    line-height: 1.4;
    color: ${Grayscale[80]};
  `,
  RecruitmentInfo: styled.div`
    opacity: 0;
    width: 0px;
    flex: none;
    padding: 0px;
    border-left: 1px solid ${Grayscale[20]};
    transition: width 0.2s ease;
    overflow: hidden;
  `,
  ActivityDate: styled.div``,
  DeadLine: styled.div``,
  Personnel: styled.div``,
  Label: styled.div`
    font-size: 10px;
    font-weight: 400;
    margin-bottom: 4px;
    color: ${Grayscale[60]};
  `,
  Text: styled.div`
    font-size: 12px;
    font-weight: 600;
    color: ${Grayscale[80]};
  `,
};
