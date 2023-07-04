// eslint-disable-next-line no-unused-vars
import React from "react";
import { Modal, PostDetail, PostImg } from "./PostModal.style";

const PostModal = ({ item }) => {

  return (
    <Modal>
      <PostDetail>
        <PostImg>
          <img src={item.imageUrl} alt="게시글 이미지" />
        </PostImg>
        <div>
          <div></div>
          <div></div>
        </div>
      </PostDetail>
    </Modal>
  )

}

export default PostModal;