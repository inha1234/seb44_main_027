import React, {useEffect, useRef} from "react";
import { Modal, PostDetail, PostImg, PostBody,CloseBtn } from "./PostDetailModal.style";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import PostContent from "./PostContent";

function PostDetailModal ({ item, setIsModal }){

  // 모달 닫기
  const closeModal = () => {
    setIsModal(false);
    window.history.back();
  }

  // 모달 밖의 영역 클릭 시 모달 닫기 로직
  const modalRef = useRef(null);
  useEffect(() => {
    function handleOutside(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeModal();
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
    };
  }, []);



  return (
    <Modal>
      <PostDetail ref={modalRef}>
        <PostImg>
          <img src={item.imageUrl} alt="게시글 이미지" />
        </PostImg>
        <PostBody>
          <PostContent item={item}/>
          <div></div>
        </PostBody>
      </PostDetail>
      <CloseBtn icon={faXmark} onClick={closeModal}/>
    </Modal>
  )

}

export default PostDetailModal;