package com.codestates.mainProject.member.controller;


import com.codestates.mainProject.dto.MultiResponseDto;
import com.codestates.mainProject.member.dto.MemberDto;
import com.codestates.mainProject.member.service.MemberService;
import com.codestates.mainProject.utils.redis.service.RedisService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/members")
public class MemberController {
    private final MemberService memberService;
    private final RedisService redisService;

    public MemberController(MemberService memberService, RedisService redisService) {
        this.memberService = memberService;
        this.redisService = redisService;
    }

    @PostMapping("/signUp")
    public ResponseEntity signUpMember(@Valid @RequestBody MemberDto.Post post){
        memberService.createMember(post);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
    @PutMapping("/{member_id}")
    public ResponseEntity putMember(Authentication authentication, @PathVariable("member_id") long memberId, @Valid @RequestBody MemberDto.Put put){
        memberService.putMember(authentication, memberId,put);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @GetMapping("/{member_id}")
    public ResponseEntity getMember(@PathVariable("member_id") long memberId){
        MemberDto.Response response = memberService.getMember(memberId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @DeleteMapping("/{member_id}")
    public ResponseEntity deleteMember(Authentication authentication, @PathVariable("member_id") long memberId){
        memberService.deleteMember(authentication, memberId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @PostMapping("/findExist")
    public ResponseEntity findExist(@Valid @RequestBody MemberDto.Exist exist){
        memberService.findMemberByExist(exist);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/getMyPosts/{member_id}")
    public ResponseEntity getMyPosts(@PathVariable("member_id") long memberId,
                                     @RequestParam(value = "category") String category,
                                     @Positive @RequestParam(value = "page", defaultValue = "1") int page,
                                     @Positive @RequestParam(value = "size", defaultValue = "15") int size,
                                     @Positive @RequestParam(value = "lastPostId",required = false) Long lastPostId){
        MultiResponseDto response = memberService.findPosts(memberId, category, page, size, lastPostId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @PostMapping("/logOut")
    public ResponseEntity memberLogOut(HttpServletRequest request){
        redisService.setBackList(request.getHeader("Authorization").replace("Bearer ", ""),"로그아웃", 30);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
