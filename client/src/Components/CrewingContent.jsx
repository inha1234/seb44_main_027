import React, { useEffect, useState } from 'react';
import {
  CrewingInfo,
  Label,
  Content,
  Container,
  CrewingParticipation,
  CrewingParticipationBtn,
} from './CrewingContent.style';
import useUpdatePost from '../utils/hooks/useUpdatePost';
import koTime from '../utils/koTime';
import { useApi } from '../utils/hooks/useApi';
import usePortalModal from '../utils/hooks/usePortalModal';
import PortalModal from '../utils/PortalModal';
import FollowList from './FollowList';

function CrewingContent({ data, type }) {
  const statusConstant = {
    apply: {
      className: 'apply',
      BtnText: '참가신청',
    },
    cancel: {
      className: 'cancel',
      BtnText: '신청취소',
    },
    close: {
      className: 'close',
      BtnText: '모집마감',
    },
  };

  const resMsg = {
    success: 'You have successfully applied to the crewing',
    cancel: 'Crewing application canceled.',
  };

  const applicantListModal = usePortalModal();
  const api = useApi();
  const loginId = localStorage.getItem('memberId');
  const accessToken = localStorage.getItem('authToken');
  const url = `${import.meta.env.VITE_API_URL}/crewings/apply/${
    data.crewingId
  }`;
  const [isLoding, setIsLoding] = useState(true);
  const [update] = useUpdatePost(data.crewingId, type, setIsLoding);
  const isUnlimited = data.maxPeople === 999;
  const isMyCrewing = data.memberId + '' === loginId + '';
  const [btnStatus, setBtnStatus] = useState({});

  // 초기 버튼 상태 설정
  const applicationStatus = () => {
    if (data.completed) {
      setBtnStatus(statusConstant.close);
    } else {
      const result = data.crewingMembers.find(
        (item) => item.memberId + '' === loginId + ''
      );
      if (!!result) {
        setBtnStatus(statusConstant.cancel);
      } else {
        setBtnStatus(statusConstant.apply);
      }
    }
  };
  useEffect(() => {
    applicationStatus();
  }, []);

  // 참가신청 API
  const participation = () => {
    api
      .post(
        url,
        {
          crewingId: data.crewingId,
          memberId: loginId,
        },
        {
          headers: {
            Authorization: accessToken,
          },
        }
      )
      .then((response) => {
        console.log('참가신청이 완료되었습니다.');
        setBtnStatus(
          response.data === resMsg.success
            ? statusConstant.cancel
            : statusConstant.apply
        );
        update();
      })
      .catch((error) => {
        alert('모집이 마감되었어요.');
        update();
        throw error;
      });
  };

  // 참가신청 버튼 클릭
  const handleClick = () => {
    if (!data.completed) {
      participation();
    }
  };

  return (
    <Container>
      {applicantListModal.showModal && (
        <PortalModal
          position={applicantListModal.modalPosition}
          onOutsideClick={applicantListModal.closeModal}
        >
          <FollowList list={data.crewingMembers} />
        </PortalModal>
      )}
      <CrewingInfo.Container>
        <CrewingInfo.ActivityDate>
          <Label>활동날짜</Label>
          <Content>{koTime(data.activityDate)}</Content>
        </CrewingInfo.ActivityDate>
        <CrewingInfo.DeadLine>
          <Label>모집마감</Label>
          <Content>{koTime(data.deadLine)}</Content>
        </CrewingInfo.DeadLine>
        <CrewingInfo.PersonnelStatus
          style={{ cursor: 'default' }}
          onClick={applicantListModal.openModal}
        >
          <Label>모집인원</Label>
          <Content>{`${data.currentPeople} / ${
            isUnlimited ? '무제한' : data.maxPeople
          }`}</Content>
        </CrewingInfo.PersonnelStatus>
      </CrewingInfo.Container>

      {!isMyCrewing && (
        <CrewingParticipation>
          <CrewingParticipationBtn
            className={btnStatus.className}
            onClick={handleClick}
          >
            {btnStatus.BtnText}
          </CrewingParticipationBtn>
        </CrewingParticipation>
      )}
    </Container>
  );
}

export default CrewingContent;
