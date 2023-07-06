package com.codestates.mainProject.follow.repository;

import com.codestates.mainProject.follow.entity.Follow;
import com.codestates.mainProject.follow.entity.FollowKey;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FollowRepository extends JpaRepository<Follow, FollowKey> {
    Follow findByFollowerIdAndFollowingId(long followerId, long FollowingId);
    List<Follow> findFollowerIdsByFollowingId(Long followingId);
    List<Follow> findFollowingIdsByFollowerId(Long followerId);
    int countByFollowerId(long followerId);
    int countByFollowingId(long followingId);
}
