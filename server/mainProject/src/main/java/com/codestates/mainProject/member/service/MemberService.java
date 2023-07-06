package com.codestates.mainProject.member.service;


import com.codestates.mainProject.member.dto.MemberDto;
import com.codestates.mainProject.member.entity.Member;
import com.codestates.mainProject.member.mapper.MemberMapper;
import com.codestates.mainProject.member.repository.MemberRepository;
import com.codestates.mainProject.exception.BusinessLogicException;
import com.codestates.mainProject.exception.ExceptionCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class MemberService {
    private final MemberRepository memberRepository;
    private final MemberMapper memberMapper;

    public MemberService(MemberRepository memberRepository, MemberMapper memberMapper) {
        this.memberRepository = memberRepository;
        this.memberMapper = memberMapper;
    }

    public void createMember(MemberDto.Post post){
        findByEmailPost(post.getEmail());
        Member member = memberMapper.memberPostDtoToMember(post);
        Member savedMember = memberRepository.save(member);
        memberMapper.memberToMemberResponseDto(savedMember);
    }

    public void putMember(long memberId,MemberDto.Put put){
        Member findMember = findMember(memberId);
        Optional.ofNullable(put.getUsername())
                .ifPresent(findMember::setUsername);
        Optional.ofNullable(put.getPassword())
                .ifPresent(findMember::setPassword);
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
