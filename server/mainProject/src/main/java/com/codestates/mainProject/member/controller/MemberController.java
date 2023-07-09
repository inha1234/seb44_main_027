package com.codestates.mainProject.member.controller;


import com.codestates.mainProject.member.dto.MemberDto;
import com.codestates.mainProject.member.service.MemberService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/members")
public class MemberController {
    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @PostMapping("/signUp")
    public ResponseEntity signUpMember(@RequestBody MemberDto.Post post){
        memberService.createMember(post);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
    @PutMapping("/{member_id}")
    public ResponseEntity putMember(Authentication authentication, @PathVariable("member_id") long memberId, @RequestBody MemberDto.Put put){
        memberService.putMember(authentication, memberId,put);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{member_id}")
    public ResponseEntity getMember(@PathVariable("member_id") long memberId){
        MemberDto.Response response = memberService.getMember(memberId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @DeleteMapping("/{member_id}")
    public ResponseEntity deleteMember(Authentication authentication,@PathVariable("member_id") long memberId){
        memberService.deleteMember(authentication, memberId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @PostMapping("/findExist")
    public ResponseEntity findExist(@RequestBody MemberDto.Exist exist){
        memberService.findExist(exist);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
