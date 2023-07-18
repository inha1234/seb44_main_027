import {
  InvalidInputIndicator,
  ModalBackdrop,
  ModalButton,
  ModalCloseButton,
  ModalHeading,
  ModalHeadingContainer,
  ModalInput,
  ModalInputContainer,
  ModalSubHeading,
  UsernameModalContainer,
} from './Modal.style';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { checkNicknameDuplicate } from '../utils/signUpService';
import { useState, useEffect } from 'react';

function UsernameModal({ isModalOpen, handleModalToggle, memberId }) {
  const [newUsername, setNewUsername] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [hasAttemptedInput, setHasAttemptedInput] = useState(false);
  const [isDuplicateChecked, setIsDuplicateChecked] = useState(false);

  const handleUsernameChange = (e) => {
    if (!hasAttemptedInput) {
      setHasAttemptedInput(true);
    }
    setIsDuplicateChecked(false); // Here
    setNewUsername(e.target.value);
  };

  const handleCheckNicknameDuplicate = () => {
    checkNicknameDuplicate(newUsername)
      .then(() => {
        alert('사용할 수 있는 닉네임입니다');
        setIsDuplicateChecked(true);
      })
      .catch((error) => {
        setIsDuplicateChecked(false);
        if (error.response && error.response.status === 409) {
          alert('이미 등록된 닉네임입니다');
        } else {
          alert('오류가 발생했습니다. 다시 시도해주세요');
        }
      });
  };

  const handleChangeButtonClick = () => {
    const authToken = sessionStorage.getItem('authToken');

    axios
      .put(
        `${import.meta.env.VITE_API_URL}/members/${memberId}`,
        { userName: newUsername },
        { headers: { Authorization: authToken } }
      )
      .then((response) => {
        if (response.status === 200) {
          alert('닉네임을 성공적으로 변경했습니다.');
          setNewUsername('');
          handleModalToggle();
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
        alert('오류가 발생했습니다. 다시 시도해주세요.');
        window.location.reload();
      });
  };

  useEffect(() => {
    const validateUsername = () => {
      const hasNoSpaces = !/\s/.test(newUsername);
      const hasValidLength = newUsername.length <= 8;
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
              <ModalInputContainer>
                <ModalInput
                  style={{ width: '350px' }}
                  value={newUsername}
                  onChange={handleUsernameChange}
                />
                <ModalButton
                  style={{
                    margin: '10px',
                    height: '60px',
                  }}
                  onClick={handleCheckNicknameDuplicate}
                  disabled={!isValid}
                >
                  중복 확인
                </ModalButton>
              </ModalInputContainer>
              <InvalidInputIndicator>
                {!isValid &&
                  hasAttemptedInput &&
                  '닉네임은 최대 8자의 공백 없는 문자만 사용 가능합니다.'}
              </InvalidInputIndicator>
              <ModalButton
                onClick={handleChangeButtonClick}
                disabled={!isDuplicateChecked}
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
