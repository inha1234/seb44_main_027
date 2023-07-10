package com.codestates.mainProject.follow.service;

import com.codestates.mainProject.follow.dto.FollowDto;
import com.codestates.mainProject.member.entity.Member;
import com.codestates.mainProject.member.repository.MemberRepository;
import com.codestates.mainProject.exception.BusinessLogicException;
import com.codestates.mainProject.exception.ExceptionCode;
import com.codestates.mainProject.follow.entity.Follow;
import com.codestates.mainProject.follow.repository.FollowRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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

    public List<FollowDto.Members> getFollowers(Long memberId) {
        List<Follow> followerIds = followRepository.findFollowerIdsByFollowingId(memberId);
        List<Long> distinctFollowerIds = followerIds.stream()
                .map(follower -> follower.getFollowerId())
                .distinct()
                .collect(Collectors.toList());

        List<FollowDto.Members> followers = new ArrayList<>();

        for (Long followerId : distinctFollowerIds) {
            Member member = memberRepository.findById(followerId)
                    .orElseThrow(() -> new BusinessLogicException(ExceptionCode.FOLLOW_NOT_FOUND));

            FollowDto.Members members = new FollowDto.Members();
            members.setUsername(member.getUsername());
            members.setMemberId(member.getMemberId());

            followers.add(members);
        }
        return followers;
    }

    public List<FollowDto.Members> getFollowings(Long memberId) {
        List<Follow> followingIds = followRepository.findFollowingIdsByFollowerId(memberId);
        List<Long> distinctFollowingIds = followingIds.stream()
                .map(following -> following.getFollowingId())
                .distinct()
                .collect(Collectors.toList());

        List<FollowDto.Members> followings = new ArrayList<>();

        for (Long followerId : distinctFollowingIds) {
            Member member = memberRepository.findById(followerId)
                    .orElseThrow(() -> new BusinessLogicException(ExceptionCode.FOLLOW_NOT_FOUND));

            FollowDto.Members members = new FollowDto.Members();
            members.setUsername(member.getUsername());
            members.setMemberId(member.getMemberId());

            followings.add(members);
        }
        return followings;
    }


    public void unFollowUser(long followerId, long followingId) {
        Follow follow = followRepository.findByFollowerIdAndFollowingId(followerId, followingId);

        followRepository.delete(follow);
    }

}
