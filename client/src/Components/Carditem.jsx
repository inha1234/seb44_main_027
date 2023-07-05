import React, {useState} from 'react';
import { Card } from './Carditem.style';
import PostModal from './PostModal';

function Carditem ({ item }){

  const [isModal, setIsModal] = useState(false);

  const hendleClick = () => {
    setIsModal(!isModal)
    const newURL = "/new-url"; // 변경하고자 하는 URL
    window.history.pushState({}, "", newURL);
  }

  return (
    <>
      <Card onClick={hendleClick}>
        <img src={item.imageUrl} alt="카드이미지" />
      </Card>
      {isModal ? <PostModal item={item}/> : undefined}
    </>
  )
}

export default Carditem;