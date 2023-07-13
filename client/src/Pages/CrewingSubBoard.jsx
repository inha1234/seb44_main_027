import { useEffect, useState } from 'react';
import Carditem from '../Components/Carditem';
import { CardList } from '../Components/ShareBoard.style';

function CrewingSubBoard({ memberId }) {
  const [posts, setPosts] = useState([]);

  return (
    <CardList>
      {posts.map((item) => (
        <Carditem item={item} key={item.postId} />
      ))}
    </CardList>
  );
}

export default CrewingSubBoard;
