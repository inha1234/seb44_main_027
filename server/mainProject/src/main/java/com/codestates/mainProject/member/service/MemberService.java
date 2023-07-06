package com.codestates.mainProject.member.service;


import com.codestates.mainProject.member.dto.MemberDto;
import com.codestates.mainProject.member.entity.Member;
import com.codestates.mainProject.member.mapper.MemberMapper;
import com.codestates.mainProject.member.repository.MemberRepository;
import com.codestates.mainProject.exception.BusinessLogicException;
import com.codestates.mainProject.exception.ExceptionCode;
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

    public MemberService(MemberRepository memberRepository, MemberMapper memberMapper, PasswordEncoder passwordEncoder) {
        this.memberRepository = memberRepository;
        this.memberMapper = memberMapper;
        this.passwordEncoder = passwordEncoder;
    }

    public void createMember(MemberDto.Post post){
        findByEmailPost(post.getEmail());
        Member member = memberMapper.memberPostDtoToMember(post);
//        List<String> roles = authorityUtils.createRoles();
//        member.setRoles(roles);
        member.setPassword(encodePassword(member.getPassword()));
        Member savedMember = memberRepository.save(member);
        memberMapper.memberToMemberResponseDto(savedMember);
    }

    public void putMember(long memberId,MemberDto.Put put){
        Member findMember = findMember(memberId);
        Optional.ofNullable(put.getUsername())
                .ifPresent(findMember::setUsername);
        Optional.ofNullable(put.getPassword())
                .ifPresent(password -> findMember.setPassword(encodePassword(password)));
        Optional.ofNullable(put.getActivityArea())
                .ifPresent(findMember::setActivityArea);
//        Optional.ofNullable(put.getImageUrl())
//                .ifPresent(findMember::setImageUrl);
        memberRepository.save(findMember);
    }

    public MemberDto.Response getMember(long memberId){
        Member member = findMember(memberId);
        return memberMapper.memberToMemberResponseDto(member);
    }

    public void deleteMember(long memberId){
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        if(!member.isActive()){
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
       }
        member.setActive(false);

    }

    private String encodePassword(String password){
        String encodePassword = passwordEncoder.encode(password);
        return encodePassword;
    }

    private void findByEmailPost(String email){
        if(memberRepository.findByEmail(email).isPresent()){
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXIST);
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
}
