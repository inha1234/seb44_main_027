import { useState, useEffect } from 'react';
import {
  DeleteModalContainer,
  InvalidInputIndicator,
  ModalBackdrop,
  ModalButton,
  ModalCloseButton,
  ModalHeading,
  ModalHeadingContainer,
  ModalInput,
  ModalSubHeading,
} from './Modal.style';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function DeleteModal({ isModalOpen, handleModalToggle, memberId }) {
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmationText, setConfirmationText] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [hasAttemptedInput, setHasAttemptedInput] = useState(false);

  const handlePasswordChange = (e) => {
    if (!hasAttemptedInput) {
      setHasAttemptedInput(true);
    }
    setPassword(e.target.value);
  };

  const handleConfirmationChange = (e) => {
    if (!hasAttemptedInput) {
      setHasAttemptedInput(true);
    }
    setConfirmationText(e.target.value);
  };

  useEffect(() => {
    const validateInput = () => {
      const isPasswordNotEmpty = password.trim() !== '';
      const isConfirmationCorrect = confirmationText === '네, 탈퇴하겠습니다.';
      return isPasswordNotEmpty && isConfirmationCorrect;
    };

    setIsValid(validateInput());
  }, [password, confirmationText]);

  const handleDeleteButtonClick = () => {
    const authToken = sessionStorage.getItem('authToken');

    axios
      .delete(
        `${import.meta.env.VITE_API_URL}/members/${memberId}`,
        { password: password },
        {
          headers: {
            Authorization: authToken,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          alert('성공적으로 탈퇴되었습니다.');
          sessionStorage.clear();
          navigate('/login');
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 401) {
            alert('권한이 유효하지 않습니다. 다시 로그인해주세요.');
            sessionStorage.clear();
            navigate('/login');
          } else if (error.response.status === 400) {
            alert('비밀번호가 일치하지 않습니다. 다시 시도해주세요.');
            setPassword('');
            setConfirmationText('');
          }
        } else {
          alert('오류가 발생했습니다. 다시 시도해주세요.');
          handleModalToggle();
        }
      });
  };

  return (
    <>
      {isModalOpen ? (
        <ModalBackdrop
          onClick={() => {
            handleModalToggle();
          }}
        >
          <DeleteModalContainer onClick={(e) => e.stopPropagation()}>
            <ModalCloseButton icon={faXmark} onClick={handleModalToggle} />
            <ModalHeadingContainer>
              <ModalHeading>정말로 탈퇴하시겠습니까?</ModalHeading>
              <ModalSubHeading>
                정확한 의사 확인을 위해 비밀번호와 아래 텍스트를 입력해주세요.
              </ModalSubHeading>
            </ModalHeadingContainer>
            <ModalInput
              value={password}
              onChange={handlePasswordChange}
              placeholder="비밀번호를 입력해주세요."
              type="password"
            />
            <ModalInput
              value={confirmationText}
              onChange={handleConfirmationChange}
              placeholder={`'네, 탈퇴하겠습니다.'를 정확하게 기입해주세요.`}
            />
            <InvalidInputIndicator>
              {!isValid &&
                hasAttemptedInput &&
                '비밀번호가 비어있거나, 텍스트가 정확하지 않습니다.'}
            </InvalidInputIndicator>
            <ModalButton disabled={!isValid} onClick={handleDeleteButtonClick}>
              탈퇴하기
            </ModalButton>
          </DeleteModalContainer>
        </ModalBackdrop>
      ) : null}
    </>
  );
}

export default DeleteModal;
