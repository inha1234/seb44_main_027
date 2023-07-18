import React, { useState } from 'react';
import {
  PostContainer,
  Author,
  Title,
  AuthorInfo,
  EditStyle,
} from './PostContent.style';
import PostEditDelete from './PostEditDelete';
import PostContentText from './PostContentText';
import useUpdatePost from '../utils/hooks/useUpdatePost';
import axios from 'axios';
import CrewingContent from './CrewingContent';
import formatTime from '../utils/formatTime';
import ProfileLink from '../utils/ProfileLink';

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

  // 운동/식단 게시글 수정 API
  const EditPostData = () => {
    axios
      .put(
        EditPostUrl,
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

  // 크루잉 게시글 수정 API
  const EditCrewingData = () => {
    axios
      .put(
        EditCrewingUrl,
        {
          title: title,
          content: content,
          maxPeople: data.maxPeople,
          maxLimit: data.maxLimit,
          currentPeople: data.currentPeople,
          imageUrl: data.imageUrl,
          activityDate: data.activityDate,
          deadLine: data.deadLine,
          isCompleted: data.isCompleted,
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
    if (type === 'crewing') {
      EditCrewingData();
    } else {
      EditPostData();
    }
    setIsEdit(false);
  };

  return (
    <PostContainer edit={isEdit.toString()} type={type}>
      <Author>
        <AuthorInfo.Container>
          <ProfileLink
            profileUserId={data.memberId}
            element={
              <AuthorInfo.LinkContainer>
                <AuthorInfo.Profile to={`/profile/${data.memberId}`}>
                  <img src={data.userImageUrl} alt="게시글 이미지" />
                </AuthorInfo.Profile>
                <AuthorInfo.AuthorName to={`/profile/${data.memberId}`}>
                  {data.userName}
                </AuthorInfo.AuthorName>
              </AuthorInfo.LinkContainer>
            }
          />
          <AuthorInfo.CreateAt>
            {formatTime(data.createdAt)}
          </AuthorInfo.CreateAt>
        </AuthorInfo.Container>

        {
          /* 본인이 작성한 게시물에 대해서만 수정/삭제 버튼을 표시 */
          loginId === memberId && !isEdit ? (
            <PostEditDelete data={data} type={type} setIsEdit={setIsEdit} />
          ) : undefined
        }
        {isEdit ? (
          <EditStyle.CancelBtn onClick={handleClickCancel}>
            취소
          </EditStyle.CancelBtn>
        ) : undefined}
      </Author>
      {!isEdit ? (
        <>
          <Title>{title}</Title>
          <PostContentText data={data} type={type} />
          {type === 'crewing' ? (
            <CrewingContent data={data} type={type} />
          ) : undefined}
        </>
      ) : (
        <EditStyle.Container>
          <EditStyle.Title
            value={title}
            onChange={handleChangeTitle}
          ></EditStyle.Title>
          <EditStyle.Content
            value={content}
            onChange={handleChangeContent}
          ></EditStyle.Content>
          <EditStyle.EditBtn onClick={handleClickEdit}>
            수정완료
          </EditStyle.EditBtn>
        </EditStyle.Container>
      )}
    </PostContainer>
  );
}

export default PostContent;
