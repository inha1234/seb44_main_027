package com.codestates.mainProject.member.service;

import com.codestates.mainProject.authority.util.AuthorityUtil;
import com.codestates.mainProject.member.dto.MemberDto;
import com.codestates.mainProject.member.entity.Member;
import com.codestates.mainProject.member.mapper.MemberMapper;
import com.codestates.mainProject.member.repository.MemberRepository;
import com.codestates.mainProject.exception.BusinessLogicException;
import com.codestates.mainProject.exception.ExceptionCode;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class MemberService {
    private final MemberRepository memberRepository;
    private final MemberMapper memberMapper;
    private final PasswordEncoder passwordEncoder;
    private final AuthorityUtil authorityUtil;
    private final String FIND_EMAIL_KEY = "email";
    private final String FIND_USER_NAME_KEY = "userName";

    public MemberService(MemberRepository memberRepository, MemberMapper memberMapper, PasswordEncoder passwordEncoder, AuthorityUtil authorityUtil) {
        this.memberRepository = memberRepository;
        this.memberMapper = memberMapper;
        this.passwordEncoder = passwordEncoder;
        this.authorityUtil = authorityUtil;
    }

    public void createMember(MemberDto.Post post){
        findExist(post.getEmail(), FIND_EMAIL_KEY);
        findExist(post.getUserName(), FIND_USER_NAME_KEY);
        Member member = memberMapper.memberPostDtoToMember(post);
        List<String> roles = authorityUtil.createRoles();
        member.setRoles(roles);
        member.setPassword(encodePassword(member.getPassword()));
        Member savedMember = memberRepository.save(member);
        memberMapper.memberToMemberResponseDto(savedMember);
    }

    public void putMember(Authentication authentication, long memberId, MemberDto.Put put){
        Member findMember = findMember(memberId);
        Long authenticationMemberId = getMemberId(authentication);
        if(findMember.getMemberId().equals(authenticationMemberId)){
            Optional.ofNullable(put.getUserName())
                    .ifPresent(findMember::setUserName);
            Optional.ofNullable(put.getPassword())
                    .ifPresent(password -> findMember.setPassword(encodePassword(password)));
            Optional.ofNullable(put.getActivityArea())
                    .ifPresent(findMember::setActivityArea);
            Optional.ofNullable(put.getImageUrl())
                    .ifPresent(findMember::setImageUrl);
            memberRepository.save(findMember);
        } else {
            throw new BusinessLogicException(ExceptionCode.NO_PERMISSION);
        }
    }

    @Transactional(readOnly = true)
    public MemberDto.Response getMember(long memberId){
        Member member = findMember(memberId);
        return memberMapper.memberToMemberResponseDto(member);
    }

    public void deleteMember(Authentication authentication,long memberId){
        Member findMember = findMember(memberId);
        Long authenticationMemberId = getMemberId(authentication);
        if(findMember.getMemberId().equals(authenticationMemberId)){
            findMember.setActive(false);
        } else {
            throw new BusinessLogicException(ExceptionCode.NO_PERMISSION);
        }
    }
    @Transactional(readOnly = true)
    public void findExist(MemberDto.Exist exist){
        if(!(exist.getEmail()==null) && exist.getUserName()==null){
            findExist(exist.getEmail(), FIND_EMAIL_KEY);
        } else if (!(exist.getUserName()==null) && exist.getEmail()==null) {
            findExist(exist.getUserName(), FIND_USER_NAME_KEY);
        } else {
            throw new BusinessLogicException(ExceptionCode.INVALID_REQUEST);
        }
    }


    private String encodePassword(String password){
        String encodePassword = passwordEncoder.encode(password);
        return encodePassword;
    }
    private void findExist(String exist, String findExist){
        if(findExist.equals(FIND_EMAIL_KEY)){
            if(memberRepository.findByEmail(exist).isPresent()){
                throw new BusinessLogicException(ExceptionCode.MEMBER_EXIST);
            }
        } else if (findExist.equals(FIND_USER_NAME_KEY)) {
            if(memberRepository.findByUserName(exist).isPresent()){
                throw new BusinessLogicException(ExceptionCode.USERNAME_EXIST);
            }
        }
    }

    private Member findMember(Long memberId){
        Member findMember = memberRepository.findById(memberId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        if(!findMember.isActive()){
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
        }
        return findMember;
    }

    private long getMemberId(Authentication authentication){
        String email = (String) authentication.getPrincipal();
        Long memberId = memberRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND)).getMemberId();
        return memberId;
    }

    public Member getMemberById(long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }
}
