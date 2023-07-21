import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { faFaceFlushed } from '@fortawesome/free-regular-svg-icons';
import {
  MessageContainer,
  MessageDetails,
  MessageEmoji,
  MessageHeading,
  MessageSubHeading,
} from './AuthRedirect.style';
import gif from '../assets/loading-spinner.gif';

function AuthRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/login');
    }, 3000); // 3초 후에 로그인 페이지로 이동
  }, [navigate]);

  return (
    <MessageContainer>
      <MessageEmoji icon={faFaceFlushed} />
      <MessageHeading>이런!</MessageHeading>
      <MessageSubHeading>로그인 정보가 없어요!</MessageSubHeading>
      <MessageDetails>
        로그인이 만료되었거나, 아직 로그인하지 않은 상태인 것 같아요.
      </MessageDetails>
      <img style={{ width: '50px' }} src={gif} alt="loading-spinner" />
      <MessageDetails>잠시 후에 로그인 페이지로 이동할게요.</MessageDetails>
    </MessageContainer>
  );
}

export default AuthRedirect;
