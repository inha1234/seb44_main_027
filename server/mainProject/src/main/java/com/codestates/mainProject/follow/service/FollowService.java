package com.codestates.mainProject.follow.service;

import com.codestates.mainProject.comment.entity.Comment;
import com.codestates.mainProject.member.entity.Member;
import com.codestates.mainProject.member.repository.MemberRepository;
import com.codestates.mainProject.exception.BusinessLogicException;
import com.codestates.mainProject.exception.ExceptionCode;
import com.codestates.mainProject.follow.entity.Follow;
import com.codestates.mainProject.follow.repository.FollowRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FollowService {
    private final FollowRepository followRepository;
    private final MemberRepository memberRepository;

    public FollowService(FollowRepository followRepository, MemberRepository memberRepository) {
        this.followRepository = followRepository;
        this.memberRepository = memberRepository;
    }

    public Follow followUser(Follow follow) {
        Long followerId = follow.getFollowerId();
        Long followingId = follow.getFollowingId();


        if (followerId.equals(followingId)) {
            throw new BusinessLogicException(ExceptionCode.FOLLOW_SAME_ID);
        }

        Follow existingFollow = followRepository.findByFollowerIdAndFollowingId(followerId, followingId);
        if (existingFollow != null) {
            unFollowUser(followerId, followingId);
        } else {
            followRepository.save(follow);
        }
        return follow;
    }

    public int countFollowers(long memberId) {
        return followRepository.countByFollowingId(memberId);
    }

    public int countFollowings(long memberId) {
        return followRepository.countByFollowerId(memberId);
    }

    public List<Member> getFollowers(Long memberId) {
        List<Follow> followerIds = followRepository.findFollowerIdsByFollowingId(memberId);
        List<Long> distinctFollowerIds = followerIds.stream()
                .map(follower -> follower.getFollowerId())
                .distinct()
                .collect(Collectors.toList());
        return memberRepository.findAllById(distinctFollowerIds);
    }

    public List<Member> getFollowings(Long memberId) {
        List<Follow> followingIds = followRepository.findFollowingIdsByFollowerId(memberId);
        List<Long> distinctFollowingIds = followingIds.stream()
                .map(Follow::getFollowingId)
                .distinct()
                .collect(Collectors.toList());
        return memberRepository.findAllById(distinctFollowingIds);
    }


    public void unFollowUser(long followerId, long followingId) {
        Follow follow = followRepository.findByFollowerIdAndFollowingId(followerId, followingId);

        followRepository.delete(follow);
    }

}
