import React, { useState } from 'react';
import { PostContainer, Author, Title, AuthorInfo } from './PostContent.style';
import PostEditDelete from './PostEditDelete';
import PostContentText from './PostContentText';
import useUpdatePost from '../utils/hooks/useUpdatePost';
import axios from 'axios';

function PostContent({ data, type, isEdit, setIsEdit }) {
  const [title, setTitle] = useState(data.title);
  const [content, setContent] = useState(data.content);
  const accessToken = sessionStorage.getItem('authToken');
  const EditPostUrl = `${import.meta.env.VITE_API_URL}/posts/${data.postId}`;
  const EditCrewingUrl = `${import.meta.env.VITE_API_URL}/crewing/${
    data.crewingId
  }`;
  const [isLoding, setIsLoding] = useState(true);
  const [update] = useUpdatePost(data.postId, type, setIsLoding);
  const loginId = sessionStorage.getItem('memberId') + '';
  const memberId = data.memberId + '';
  const url = type === 'crewing' ? EditCrewingUrl : EditPostUrl;

  // 운동/식단 게시글 수정 API
  const EditPostData = () => {
    axios
      .put(
        url,
        {
          title: title,
          content: content,
          category: data.category,
          imageUrl: data.imageUrl,
        },
        {
          headers: {
            Authorization: accessToken,
          },
        }
      )
      .then((response) => {
        console.log('수정이 완료되었습니다.');
        update();
      })
      .catch((error) => {
        throw error;
      });
  };

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleChangeContent = (e) => {
    setContent(e.target.value);
  };
  const handleClickCancel = (e) => {
    setIsEdit(false);
  };
  const handleClickEdit = (e) => {
    EditPostData();
    setIsEdit(false);
  };
  console.log(data);

  return (
    <PostContainer>
      <Author>
        <AuthorInfo.Container>
          <AuthorInfo.Profile to={`/members/${data.memberId}`}>
            <img src={data.userImageUrl} alt="게시글 이미지" />
          </AuthorInfo.Profile>
          <AuthorInfo.AuthorName to={`/members/${data.memberId}`}>
            {data.userName}
          </AuthorInfo.AuthorName>
          <AuthorInfo.CreateAt>{data.createdAt}</AuthorInfo.CreateAt>
        </AuthorInfo.Container>

        {
          /* 본인이 작성한 게시물에 대해서만 수정/삭제 버튼을 표시 */
          loginId === memberId ? (
            <PostEditDelete data={data} type={type} setIsEdit={setIsEdit} />
          ) : undefined
        }
        {isEdit ? <button onClick={handleClickCancel}>취소</button> : undefined}
      </Author>
      {!isEdit ? (
        <>
          <Title>{title}</Title>
          <PostContentText data={data} type={type} />
        </>
      ) : (
        <>
          <input value={title} onChange={handleChangeTitle}></input>
          <input value={content} onChange={handleChangeContent}></input>
          <button onClick={handleClickEdit}>수정완료</button>
        </>
      )}
    </PostContainer>
  );
}

export default PostContent;
