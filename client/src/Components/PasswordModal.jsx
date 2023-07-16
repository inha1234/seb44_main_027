import { useState, useEffect } from 'react';
import {
  InvalidInputIndicator,
  ModalBackdrop,
  ModalButton,
  ModalCloseButton,
  ModalHeading,
  ModalInput,
  PasswordModalContainer,
} from './Modal.style';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PasswordModal({ isModalOpen, handleModalToggle, memberId }) {
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isValidNewPassword, setIsValidNewPassword] = useState(false);
  const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(false);
  const [
    hasAttemptedCurrentPasswordInput,
    setHasAttemptedCurrentPasswordInput,
  ] = useState(false);
  const [hasAttemptedNewPasswordInput, setHasAttemptedNewPasswordInput] =
    useState(false);
  const [
    hasAttemptedConfirmPasswordInput,
    setHasAttemptedConfirmPasswordInput,
  ] = useState(false);

  const handleCurrentPasswordChange = (e) => {
    if (!hasAttemptedCurrentPasswordInput) {
      setHasAttemptedCurrentPasswordInput(true);
    }
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    if (!hasAttemptedNewPasswordInput) {
      setHasAttemptedNewPasswordInput(true);
    }
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    if (!hasAttemptedConfirmPasswordInput) {
      setHasAttemptedConfirmPasswordInput(true);
    }
    setConfirmPassword(e.target.value);
  };

  useEffect(() => {
    const validateNewPassword = () => {
      const passwordPattern =
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
      return passwordPattern.test(newPassword);
    };

    const validateConfirmPassword = () => {
      return newPassword === confirmPassword;
    };

    setIsValidNewPassword(validateNewPassword());
    setIsValidConfirmPassword(validateConfirmPassword());
  }, [newPassword, confirmPassword]);

  const handlePasswordChangeButtonClick = () => {
    const authToken = sessionStorage.getItem('authToken');

    axios
      .put(
        `${import.meta.env.VITE_API_URL}/members/${memberId}`,
        { currentPassword: currentPassword, newPassword: newPassword },
        {
          headers: {
            Authorization: authToken,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          alert('비밀번호가 성공적으로 변경되었습니다');
          window.location.reload();
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
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
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
        <ModalBackdrop onClick={() => handleModalToggle()}>
          <PasswordModalContainer onClick={(e) => e.stopPropagation()}>
            <ModalCloseButton icon={faXmark} onClick={handleModalToggle} />
            <ModalHeading style={{ marginTop: '50px', marginBottom: '40px' }}>
              현재 비밀번호와 <br />
              새로 사용할 비밀번호를 입력해주세요.
            </ModalHeading>
            <ModalInput
              value={currentPassword}
              onChange={handleCurrentPasswordChange}
              placeholder="현재 비밀번호를 입력해주세요."
              type="password"
              style={{ marginBottom: '25px' }}
            />
            <ModalInput
              value={newPassword}
              onChange={handleNewPasswordChange}
              placeholder="새로운 비밀번호를 입력해주세요."
              type="password"
            />
            <InvalidInputIndicator>
              {!isValidNewPassword &&
                hasAttemptedNewPasswordInput &&
                '비밀번호는 영문, 숫자, 특수문자를 포함하여 8자리 이상이어야 합니다.'}
            </InvalidInputIndicator>
            <ModalInput
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="새로운 비밀번호를 한번 더 입력해주세요."
              type="password"
            />
            <InvalidInputIndicator>
              {!isValidConfirmPassword &&
                hasAttemptedConfirmPasswordInput &&
                '새 비밀번호가 일치하지 않습니다.'}
            </InvalidInputIndicator>
            <ModalButton
              disabled={!(isValidNewPassword && isValidConfirmPassword)}
              onClick={handlePasswordChangeButtonClick}
            >
              변경
            </ModalButton>
          </PasswordModalContainer>
        </ModalBackdrop>
      ) : null}
    </>
  );
}

export default PasswordModal;
