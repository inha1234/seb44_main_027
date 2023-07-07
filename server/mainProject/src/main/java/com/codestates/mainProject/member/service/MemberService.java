package com.codestates.mainProject.member.service;


import com.codestates.mainProject.Authority.util.AuthorityUtil;
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
    private final AuthorityUtil authorityUtil;

    public MemberService(MemberRepository memberRepository, MemberMapper memberMapper, PasswordEncoder passwordEncoder, AuthorityUtil authorityUtil) {
        this.memberRepository = memberRepository;
        this.memberMapper = memberMapper;
        this.passwordEncoder = passwordEncoder;
        this.authorityUtil = authorityUtil;
    }
    public void createMember(MemberDto.Post post){
        findExist(post.getEmail(),"email");
        Member member = memberMapper.memberPostDtoToMember(post);
        List<String> roles = authorityUtil.createRoles();
        member.setRoles(roles);
        member.setPassword(encodePassword(member.getPassword()));
        Member savedMember = memberRepository.save(member);
        memberMapper.memberToMemberResponseDto(savedMember);
    }

    public void putMember(long memberId,MemberDto.Put put){
        Member findMember = findMember(memberId);
        Optional.ofNullable(put.getUserName())
                .ifPresent(findMember::setUserName);
        Optional.ofNullable(put.getPassword())
                .ifPresent(password -> findMember.setPassword(encodePassword(password)));
        Optional.ofNullable(put.getActivityArea())
                .ifPresent(findMember::setActivityArea);
//        Optional.ofNullable(put.getImageUrl())
//                .ifPresent(findMember::setImageUrl);
        memberRepository.save(findMember);
    }
    @Transactional(readOnly = true)
    public MemberDto.Response getMember(long memberId){
        Member member = findMember(memberId);
        return memberMapper.memberToMemberResponseDto(member);
    }

    public void deleteMember(long memberId){
        Member findMember = findMember(memberId);
        findMember.setActive(false);

    }
    @Transactional(readOnly = true)
    public void findExist(MemberDto.Exist exist){
        if(!(exist.getEmail()==null) && exist.getUserName()==null){
            findExist(exist.getEmail(), "email");
        } else if (!(exist.getUserName()==null) && exist.getEmail()==null) {
            findExist(exist.getUserName(),"username");
        } else {
            throw new BusinessLogicException(ExceptionCode.INVALID_REQUEST);
        }
    }


    private String encodePassword(String password){
        String encodePassword = passwordEncoder.encode(password);
        return encodePassword;
    }
    private void findExist(String exist, String findExist){
        if(findExist.equals("email")){
            if(memberRepository.findByEmail(exist).isPresent()){
                throw new BusinessLogicException(ExceptionCode.MEMBER_EXIST);
            }
        } else if (findExist.equals("username")) {
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
}
