package com.codestates.mainProject.member.service;

import com.codestates.mainProject.authority.service.AuthService;
import com.codestates.mainProject.authority.util.AuthorityUtil;
import com.codestates.mainProject.crewing.repository.CrewingRepository;
import com.codestates.mainProject.crewing.service.CrewingService;
import com.codestates.mainProject.dto.MultiResponseDto;
import com.codestates.mainProject.member.dto.MemberDto;
import com.codestates.mainProject.member.entity.Member;
import com.codestates.mainProject.member.mapper.MemberMapper;
import com.codestates.mainProject.member.repository.MemberRepository;
import com.codestates.mainProject.exception.BusinessLogicException;
import com.codestates.mainProject.exception.ExceptionCode;
import com.codestates.mainProject.posts.repository.PostRepository;
import com.codestates.mainProject.posts.service.PostService;
import com.codestates.mainProject.utils.redis.service.RedisService;
import io.jsonwebtoken.Claims;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Service
@Transactional
public class MemberService {
    private final MemberRepository memberRepository;
    private final PostRepository postRepository;
    private final CrewingRepository crewingRepository;
    private final MemberMapper memberMapper;
    private final PasswordEncoder passwordEncoder;
    private final AuthorityUtil authorityUtil;
    private final PostService postService;
    private final CrewingService crewingService;
    private final AuthService authService;
    private final RedisService redisService;
    private final String FIND_EMAIL_KEY = "email";
    private final String FIND_USER_NAME_KEY = "userName";
    private final String FIND_DIET_KEY = "diet";
    private final String FIND_WORKOUT_KEY = "workOut";
    private final String FIND_CREWING_KEY = "crewing";
    private final String FIND_CREWING_APPLY_KEY = "apply";

    public MemberService(MemberRepository memberRepository, PostRepository postRepository, CrewingRepository crewingRepository,
                         MemberMapper memberMapper, PasswordEncoder passwordEncoder, AuthorityUtil authorityUtil,
                         PostService postService, CrewingService crewingService, AuthService authService,
                         RedisService redisService) {
        this.memberRepository = memberRepository;
        this.postRepository = postRepository;
        this.crewingRepository = crewingRepository;
        this.memberMapper = memberMapper;
        this.passwordEncoder = passwordEncoder;
        this.authorityUtil = authorityUtil;
        this.postService = postService;
        this.crewingService = crewingService;
        this.authService = authService;
        this.redisService = redisService;
    }

    public void createMember(MemberDto.Post post){
        findExist(post.getEmail(), FIND_EMAIL_KEY);
        findExist(post.getUserName(), FIND_USER_NAME_KEY);
        Member member = memberMapper.memberPostDtoToMember(post);
        List<String> roles = authorityUtil.createRoles();
        member.setRoles(roles);
        member.setPassword(passwordEncoder.encode(member.getPassword()));
        Member savedMember = memberRepository.save(member);
        memberMapper.memberToMemberResponseDto(savedMember);
    }

    public void putMember(Authentication authentication, long memberId, MemberDto.Put put){
        Member findMember = findMember(memberId);
        Long authenticationMemberId = getMemberId(authentication);
        if(findMember.getMemberId().equals(authenticationMemberId)){
            Optional.ofNullable(put.getUserName())
                    .ifPresent(findMember::setUserName);
            Optional.ofNullable(put.getActivityArea())
                    .ifPresent(findMember::setActivityArea);
            Optional.ofNullable(put.getImageUrl())
                    .ifPresent(findMember::setImageUrl);
            memberRepository.save(findMember);
        } else {
            throw new BusinessLogicException(ExceptionCode.NO_PERMISSION);
        }
    }

    public void putPassword(Authentication authentication, long memberId, MemberDto.PutPassword put){
        Member findMember = findMember(memberId);
        Long authenticationMemberId = getMemberId(authentication);
        if(passwordEncoder.matches(put.getCurrentPassword(), findMember.getPassword())
                && findMember.getMemberId().equals(authenticationMemberId)){
            findMember.setPassword(passwordEncoder.encode(put.getNewPassword()));
            memberRepository.save(findMember);
        } else {
            throw new BusinessLogicException(findMember.getMemberId().equals(authenticationMemberId)
                    ?ExceptionCode.NOT_PASSWORD_MATCH
                    :ExceptionCode.NO_PERMISSION);
        }
    }

    public MemberDto.Response getMember(long memberId){
        Member member = findMember(memberId);
        MemberDto.Response response = memberMapper.memberToMemberResponseDto(member);
        response.setTotalPostCount(postRepository.countByMember(member)+crewingRepository.countByMember(member));
        return response;
    }

    public void deleteMember(Authentication authentication,long memberId, MemberDto.Delete delete){
        Member findMember = findMember(memberId);
        Long authenticationMemberId = getMemberId(authentication);
        if(passwordEncoder.matches(delete.getPassword(), findMember.getPassword())
                && findMember.getMemberId().equals(authenticationMemberId)){
            findMember.setActive(false);
            memberRepository.save(findMember);
        } else {
            throw new BusinessLogicException(findMember.getMemberId().equals(authenticationMemberId)
                    ?ExceptionCode.NOT_PASSWORD_MATCH
                    :ExceptionCode.NO_PERMISSION);
        }
    }
    @Transactional(readOnly = true)
    public void findMemberByExist(MemberDto.Exist exist){
        if(!(exist.getEmail()==null) && exist.getUserName()==null){
            findExist(exist.getEmail(), FIND_EMAIL_KEY);
        } else if (!(exist.getUserName()==null) && exist.getEmail()==null) {
            findExist(exist.getUserName(), FIND_USER_NAME_KEY);
        } else {
            throw new BusinessLogicException(ExceptionCode.INVALID_REQUEST);
        }
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
    public void memberLogOut(HttpServletRequest request){
        String authentication = request.getHeader("Authorization").replace("Bearer ","");
        Claims claims = authService.parserToken(authentication);
        Date expiration = claims.getExpiration();
        Date now = new Date();
        long diffInMillies = expiration.getTime() - now.getTime();
        int diffInMinutesInt = (int) TimeUnit.MILLISECONDS.toMinutes(diffInMillies);
        redisService.redisLogOut(authentication, diffInMinutesInt, claims.getSubject());
    }
    public MultiResponseDto findPosts(long memberId, String category, int page, int size, Long lastPostId){
        Member member = findMember(memberId);
        if(category.equals(FIND_DIET_KEY)||category.equals(FIND_WORKOUT_KEY)){
            MultiResponseDto responses = postService.getMyPosts(member, category, page, size, lastPostId);
            return responses;
        } else if(category.equals(FIND_CREWING_KEY)){
            MultiResponseDto responses = crewingService.getMyCrewings(member, page, size, lastPostId);
            return responses;
        } else if(category.equals(FIND_CREWING_APPLY_KEY)){
            MultiResponseDto response = crewingService.getMyApply(member, page, size, lastPostId);
            return response;
        } else {
            throw new BusinessLogicException(ExceptionCode.CATEGORY_NOT_FOUND);
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
