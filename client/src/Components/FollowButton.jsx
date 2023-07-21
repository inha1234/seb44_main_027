import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ActiveButton, InactiveButton } from './FollowButton.style';
import { useApi } from '../utils/hooks/useApi';

function FollowButton({ profileUserId, updateFollowerList }) {
  const api = useApi();
  const [isFollowing, setIsFollowing] = useState(false);
  const loggedInUserId = Number(localStorage.getItem('memberId'));
  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    checkFollowing();
  }, [loggedInUserId, profileUserId]);

  const checkFollowing = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/follows/followers`, {
        params: {
          memberId: profileUserId,
        },
      })
      .then((response) => {
        const followers = response.data;
        console.log(response.data);
        const isUserFollowing = followers.some(
          (follower) => follower.memberId === loggedInUserId
        );
        console.log(isUserFollowing);
        setIsFollowing(isUserFollowing);
      })
      .catch((error) => {
        console.error('Failed to check following status', error);
      });
  };

  const handleClick = () => {
    api
      .post(
        `${import.meta.env.VITE_API_URL}/follows`,
        {
          followerId: loggedInUserId,
          followingId: profileUserId,
        },
        { headers: { Authorization: authToken } }
      )
      .then((response) => {
        if (response.status === 200) {
          setIsFollowing(!isFollowing);
          updateFollowerList();
        }
      })
      .catch((error) => {
        alert('오류가 발생했습니다. 다시 시도해주세요.');
        console.error('Failed to follow/unfollow', error);
        updateFollowerList();
      });
  };

  return (
    <>
      {isFollowing ? (
        <InactiveButton onClick={handleClick}>팔로잉</InactiveButton>
      ) : (
        <ActiveButton onClick={handleClick}>팔로우</ActiveButton>
      )}
    </>
  );
}

export default FollowButton;
