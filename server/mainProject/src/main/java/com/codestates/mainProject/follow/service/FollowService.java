package com.codestates.mainProject.follow.service;

import com.codestates.mainProject.follow.dto.FollowDto;
import com.codestates.mainProject.member.entity.Member;
import com.codestates.mainProject.member.repository.MemberRepository;
import com.codestates.mainProject.exception.BusinessLogicException;
import com.codestates.mainProject.exception.ExceptionCode;
import com.codestates.mainProject.follow.entity.Follow;
import com.codestates.mainProject.follow.repository.FollowRepository;
import com.codestates.mainProject.posts.entity.Post;
import com.codestates.mainProject.posts.repository.PostRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FollowService {
    private final FollowRepository followRepository;
    private final MemberRepository memberRepository;
    private final PostRepository postRepository;

    public FollowService(FollowRepository followRepository, MemberRepository memberRepository, PostRepository postRepository) {
        this.followRepository = followRepository;
        this.memberRepository = memberRepository;
        this.postRepository = postRepository;
    }

    public Follow followUser(Follow follow) {

        String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Optional<Member> verifiedMember = memberRepository.findByEmail(principal);

        Member member = verifiedMember.
                orElseThrow(() -> new BusinessLogicException(ExceptionCode.NO_PERMISSION));

        Long followerId = follow.getFollowerId();
        Long followingId = follow.getFollowingId();

        if(followerId != member.getMemberId()){
            throw new BusinessLogicException(ExceptionCode.NO_PERMISSION);
        }

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
            members.setUserName(member.getUserName());
            members.setMemberId(member.getMemberId());
            members.setImageUrl(member.getImageUrl());
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
            members.setUserName(member.getUserName());
            members.setMemberId(member.getMemberId());
            members.setImageUrl(member.getImageUrl());

            followings.add(members);
        }
        return followings;
    }

//    public Page<Post> getFollowingPosts(long memberId, Pageable pageable) {
//        List<FollowDto.Members> followings = getFollowings(memberId);
//
//        List<Post> followingPosts = new ArrayList<>();
//
//        for (FollowDto.Members following : followings) {
//            Page<Post> posts = postRepository.findByMemberInOrderByCreatedAtDesc(following.getMemberId(), pageable);
//
//            followingPosts.addAll(posts.toList());
//        }
//
//        followingPosts.sort(Comparator.comparing(Post::getCreatedAt).reversed());
//
//        int page = pageable.getPageNumber();
//        int size = pageable.getPageSize();
//        int totalElements = followingPosts.size();
//        int fromIndex = Math.min(page * size, totalElements);
//        int toIndex = Math.min((page + 1) * size, totalElements);
//
//        return new PageImpl<>(followingPosts.subList(fromIndex, toIndex), pageable, totalElements);
//    }

    public Page<Post> getFollowingPosts(long memberId, Pageable pageable) {
        List<Follow> follows = followRepository.findByFollower_MemberId(memberId);

        List<Member> followingMembers = follows.stream()
                .map(follow -> follow.getFollowing())
                .collect(Collectors.toList());

        return postRepository.findByMemberInOrderByCreatedAtDesc(followingMembers, pageable);
    }

//    public Page<Post> getFollowingPostsAfter(long memberId, long lastPostId, Pageable pageable) {
//        Member member = memberRepository.findById(memberId)
//                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
//
//        List<Member> followingMembers = member.getFollowing().stream()
//                .map(follow -> follow.getFollowing())
//                .collect(Collectors.toList());
//
//        return postRepository.findByMemberInAndPostIdGreaterThanOrderByCreatedAtDesc(
//                followingMembers, lastPostId, pageable);
//    }

    public Page<Post> getFollowingPostsAfter(long memberId, long lastPostId, Pageable pageable) {
        Member member = new Member();
        member.setMemberId(memberId);

        List<Follow> follows = followRepository.findByFollower(member);
        List<Member> followingMembers = follows.stream()
                .map(follow -> follow.getFollowing())
                .collect(Collectors.toList());

//        return postRepository.findByMemberInAndPostIdGreaterThanOrderByCreatedAtAsc(
        return postRepository.findByMemberInAndPostIdLessThan(
                followingMembers, lastPostId, pageable);
    }


    public void unFollowUser(long followerId, long followingId) {
        Follow follow = followRepository.findByFollowerIdAndFollowingId(followerId, followingId);

        followRepository.delete(follow);
    }


}
