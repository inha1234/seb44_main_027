import { useState, useEffect } from 'react';
import {
  InvalidInputIndicator,
  ModalBackdrop,
  ModalButton,
  ModalCloseButton,
  ModalHeading,
  ModalHeadingContainer,
  ModalInput,
  ModalSubHeading,
  UsernameModalContainer,
} from './Modal.style';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function UsernameModal({ isModalOpen, handleModalToggle, memberId }) {
  const [newUsername, setNewUsername] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [hasAttemptedInput, setHasAttemptedInput] = useState(false); // 추가된 부분

  const handleUsernameChange = (e) => {
    if (!hasAttemptedInput) {
      setHasAttemptedInput(true); // 사용자가 한번이라도 입력을 시도했음을 기록합니다.
    }
    setNewUsername(e.target.value);
  };

  const handleChangeButtonClick = () => {
    const authToken = sessionStorage.getItem('authToken');

    axios
      .put(
        `${import.meta.env.VITE_API_URL}/members/${memberId}`, // API endpoint
        { userName: newUsername }, // 요청 본문
        { headers: { Authorization: authToken } } // 요청 헤더
      )
      .then((response) => {
        if (response.status === 200) {
          alert('닉네임을 성공적으로 변경했습니다.');
          setNewUsername(''); // 요청이 성공하면 newUsername 초기화
          handleModalToggle(); // 모달 창 닫기
          window.location.reload(); // 페이지 새로고침
        }
      })
      .catch((error) => {
        console.log(error);
        alert('오류가 발생했습니다. 다시 시도해주세요.');
        window.location.reload(); // 페이지 새로고침
      });
  };

  // 유효성 검사
  useEffect(() => {
    const validateUsername = () => {
      // 공백이 없는지 확인
      const hasNoSpaces = !/\s/.test(newUsername);
      // 길이가 8자 이하인지 확인
      const hasValidLength = newUsername.length <= 8;
      // 비어있지 않은지 확인
      const isNotEmpty = newUsername.trim() !== '';
      return hasNoSpaces && hasValidLength && isNotEmpty;
    };

    setIsValid(validateUsername());
  }, [newUsername]);

  return (
    <>
      {isModalOpen ? (
        <>
          <ModalBackdrop
            onClick={() => {
              handleModalToggle();
            }}
          >
            <UsernameModalContainer onClick={(e) => e.stopPropagation()}>
              <ModalCloseButton icon={faXmark} onClick={handleModalToggle} />
              <ModalHeadingContainer>
                <ModalHeading>새로운 닉네임을 입력해주세요.</ModalHeading>
                <ModalSubHeading>
                  닉네임은 최대 8자까지 작성이 가능해요.
                </ModalSubHeading>
              </ModalHeadingContainer>

              <ModalInput value={newUsername} onChange={handleUsernameChange} />
              <InvalidInputIndicator>
                {!isValid &&
                  hasAttemptedInput &&
                  '닉네임은 최대 8자의 공백 없는 문자만 사용 가능합니다.'}
              </InvalidInputIndicator>
              <ModalButton
                onClick={handleChangeButtonClick}
                disabled={!isValid}
              >
                변경
              </ModalButton>
            </UsernameModalContainer>
          </ModalBackdrop>
        </>
      ) : null}
    </>
  );
}

export default UsernameModal;
