package com.codestates.mainProject.follow.controller;

import com.codestates.mainProject.member.entity.Member;
import com.codestates.mainProject.follow.dto.FollowDto;
import com.codestates.mainProject.follow.entity.Follow;
import com.codestates.mainProject.follow.mapper.FollowMapper;
import com.codestates.mainProject.follow.service.FollowService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/follows")
@Validated
public class FollowController {
    private final FollowService followService;
    private final FollowMapper mapper;

    public FollowController(FollowService followService, FollowMapper mapper) {
        this.followService = followService;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity follow(@Valid @RequestBody FollowDto.Post followPostDto) {
        Follow follow = followService.followUser(mapper.followPostDtoToFollow(followPostDto));


        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/counts")
    public ResponseEntity countFollowers(@RequestParam("memberId") long memberId) {
        int followersCount = followService.countFollowers(memberId);
        int followingsCount = followService.countFollowings(memberId);

        Map<String, Integer> counts = new HashMap<>();
        counts.put("followersCount", followersCount);
        counts.put("followingsCount", followingsCount);

        return new ResponseEntity<>(counts, HttpStatus.OK);
    }

    @GetMapping("/followers")
    public ResponseEntity getFollowers(@RequestParam("memberId") Long memberId) {
        List<FollowDto.Members> followerMember = followService.getFollowers(memberId);

        return new ResponseEntity<>(followerMember, HttpStatus.OK);
    }

    @GetMapping("/followings")
    public ResponseEntity getFollowings(@RequestParam("memberId") Long memberId) {
        List<FollowDto.Members> followingMember = followService.getFollowings(memberId);

        return new ResponseEntity<>(followingMember, HttpStatus.OK);
    }


//    @DeleteMapping("/{follower-id}/{following-id}")
//    public ResponseEntity unfollow(@PathVariable("follower-id") long followerId, @PathVariable("following-id") long followingId) {
//        followService.unFollowUser(followerId, followingId);
//
//        return new ResponseEntity<>(HttpStatus.OK);
//    }
}
