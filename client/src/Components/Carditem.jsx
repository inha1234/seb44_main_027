import React, {useState} from 'react';
import { Card } from './Carditem.style';
import PostModal from './PostDetailModal';

function Carditem ({ item }){

  const [isModal, setIsModal] = useState(false);

  const hendleClick = () => {
    setIsModal(!isModal)
    window.history.pushState({}, "", `/posts/${item.postId}`);
  }

  return (
    <>
      <Card onClick={hendleClick}>
        <img src={item.imageUrl} alt="카드이미지" />
      </Card>
      {isModal ? <PostModal item={item} setIsModal={setIsModal}/> : undefined}
    </>
  )
}

export default Carditem;