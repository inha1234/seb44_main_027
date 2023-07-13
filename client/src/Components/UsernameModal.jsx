import { useState, useEffect } from 'react';
import {
  ModalBackdrop,
  ModalButton,
  ModalCloseButton,
  ModalHeading,
  ModalInput,
  ModalSubHeading,
  UsernameModalContainer,
} from './Modal.style';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function UsernameModal({ isModalOpen, handleModalToggle, memberId }) {
  const [newUsername, setNewUsername] = useState('');
  const [isValid, setIsValid] = useState(false);

  const handleUsernameChange = (e) => {
    setNewUsername(e.target.value);
  };

  const handleChangeButtonClick = () => {
    axios.put(
      `${import.meta.env.VITE_API_URL}/members/${memberId}`, // API endpoint
      { userName: newUsername }, // 요청 본문
      { headers: { Authorization: sessionStorage.getItem('authToken') } } // 요청 헤더
    )
    .then((response) => {
      if(response.status === 200) {
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
          <ModalBackdrop />
          <UsernameModalContainer>
            <ModalCloseButton icon={faXmark} onClick={handleModalToggle} />
            <ModalHeading>새로운 닉네임을 입력해주세요.</ModalHeading>
            <ModalSubHeading>
              닉네임은 최대 8자까지 작성이 가능해요.
            </ModalSubHeading>
            <ModalInput value={newUsername} onChange={handleUsernameChange} />
            <ModalButton onClick={handleChangeButtonClick} disabled={!isValid}>변경</ModalButton>
          </UsernameModalContainer>
        </>
      ) : null}
    </>
  );
}

export default UsernameModal;
이제 사용자가 ModalInput에 닉네임을 입력하면, 공백이 없고 길이가 8자 이하인 경우에만 ModalButton이 활성화됩니다. 또한, 모달이 닫힐 때마다 newUsername 상태가 초기화되므로 다음 번에 모달을 열 때는 비어 있는 입력 필드가 표시됩니다.






