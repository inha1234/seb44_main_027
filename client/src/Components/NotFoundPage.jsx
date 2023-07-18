import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PageContainer,
  MessageEmoji,
  MessageHeading,
  MessageSubHeading,
  MessageDetails,
} from './NotFoundPage.style';
import { faFaceSurprise } from '@fortawesome/free-regular-svg-icons';
import gif from '../assets/loading-spinner.gif';

const NotFoundPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate(-1);
    }, 3000);
  }, [navigate]);

  return (
    <PageContainer>
      <MessageEmoji icon={faFaceSurprise} />
      <MessageHeading>엥?</MessageHeading>
      <MessageSubHeading>존재하지 않는 페이지에요!</MessageSubHeading>
      <MessageDetails>
        이미 삭제되었거나, 잘못된 정보에 접근하고 있는 것 같아요.
      </MessageDetails>
      <img style={{ width: '50px' }} src={gif} alt="loading-spinner" />
      <MessageDetails>잠시 후에 이전 페이지로 이동할게요.</MessageDetails>
    </PageContainer>
  );
};

export default NotFoundPage;
