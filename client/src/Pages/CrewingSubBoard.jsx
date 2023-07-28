import { useState } from 'react';
import CrewingTabContent from '../Components/CrewingTabContent';
import { TabList, Tab } from './CrewingSubBoard.style';
import CrewingApplyTabContent from '../Components/CrewingApplyTabContent';

function CrewingSubBoard({ memberId }) {
  // 탭 상태 (기본값 'crewing')
  const [tab, setTab] = useState('crewing');

  // 탭 변경 함수
  const changeTab = (newTab) => {
    setTab(newTab);
    window.scrollTo(0, 0); // 스크롤 위치 초기화
  };

  return (
    <>
      <TabList>
        <Tab onClick={() => changeTab('crewing')} isActive={tab === 'crewing'}>
          내가 모집한 크루잉
        </Tab>
        <Tab onClick={() => changeTab('apply')} isActive={tab === 'apply'}>
          내가 참여한 크루잉
        </Tab>
      </TabList>
      {tab === 'crewing' ? (
        <CrewingTabContent memberId={memberId} />
      ) : (
        <CrewingApplyTabContent memberId={memberId} />
      )}
    </>
  );
}

export default CrewingSubBoard;
