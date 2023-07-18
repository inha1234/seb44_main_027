package com.codestates.mainProject.crewing.service;

import com.codestates.mainProject.crewing.dto.CrewingDto;
import com.codestates.mainProject.crewing.entity.Crewing;
import com.codestates.mainProject.crewing.entity.CrewingMembers;
import com.codestates.mainProject.crewing.mapper.CrewingMapper;
import com.codestates.mainProject.crewing.repository.CrewingMembersRepository;
import com.codestates.mainProject.crewing.repository.CrewingRepository;
import com.codestates.mainProject.dto.MultiResponseDto;
import com.codestates.mainProject.dto.PageInfo;
import com.codestates.mainProject.exception.BusinessLogicException;
import com.codestates.mainProject.exception.ExceptionCode;
import com.codestates.mainProject.member.entity.Member;
import com.codestates.mainProject.member.repository.MemberRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class CrewingService {
    private final CrewingRepository crewingRepository;

    private final MemberRepository memberRepository;
    private final CrewingMapper crewingmapper;
    private final CrewingMembersRepository crewingMembersRepository;

    public CrewingService(CrewingRepository crewingRepository, MemberRepository memberRepository, CrewingMapper crewingmapper, CrewingMembersRepository crewingMembersRepository) {
        this.crewingRepository = crewingRepository;
        this.memberRepository = memberRepository;
        this.crewingmapper = crewingmapper;
        this.crewingMembersRepository = crewingMembersRepository;
    }

    /** 게시글 생성 */
    public Crewing createCrewing(Crewing crewing) {
        /** JWT토큰정보를 이용한 사용자 인증 */
        String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Optional<Member> verifiedMember = memberRepository.findByEmail(principal);

        Member member = verifiedMember.
                orElseThrow(() -> new BusinessLogicException(ExceptionCode.NO_PERMISSION));

        CrewingMembers crewingMember = new CrewingMembers();
        crewingMember.setMember(member);
        crewingMember.setCrewing(crewing);
        crewing.setCurrentPeople(0); // 초기 값은 0으로 설정
        crewing.setCompleted(false); // 초기 값은 false로 설정

        return crewingRepository.save(crewing);
    }

    /** 게시글 수정 */
    public Crewing updateCrewing(Crewing crewing) {
        Crewing findCrewing = findVerifiedCrewing(crewing.getCrewingId());
        /** JWT토큰정보를 이용한 사용자 인증 */
        /*String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        if (!findPost.getMember().getEmail().equals(principal))
            throw new BusinessLogicException(ExceptionCode.NO_PERMISSION);*/

        Optional.ofNullable(crewing.getTitle())
                .ifPresent(title -> findCrewing.setTitle(title));
        Optional.ofNullable(crewing.getContent())
                .ifPresent(content -> findCrewing.setContent(content));
        Optional.ofNullable(crewing.getMaxPeople())
                .ifPresent(maxPeople -> findCrewing.setMaxPeople(maxPeople));
        Optional.ofNullable(crewing.getCurrentPeople())
                .ifPresent(currentPeople -> findCrewing.setCurrentPeople(currentPeople));
        Optional.ofNullable(crewing.isMaxLimit())
                .ifPresent(maxLimit -> findCrewing.setMaxLimit(maxLimit));
        Optional.ofNullable(crewing.getImageUrl())
                .ifPresent(imageUrl -> findCrewing.setImageUrl(imageUrl));
        Optional.ofNullable(crewing.getActivityDate())
                .ifPresent(activityDate -> findCrewing.setActivityDate(activityDate));
        Optional.ofNullable(crewing.getDeadLine())
                .ifPresent(deadLine -> findCrewing.setDeadLine(deadLine));
        Optional.ofNullable(crewing.isCompleted())
                .ifPresent(isCompleted -> findCrewing.setCompleted(isCompleted));
        return crewingRepository.save(findCrewing);
    }
    public void canApply(long crewingId, CrewingDto.applyDto apply){
        Crewing crewing = crewingRepository.findByCrewingId(crewingId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.CREWING_NOT_FOUND));
        Member member = memberRepository.findById(apply.getMemberId())
                .orElseThrow(()-> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        if(crewing.getMember().getMemberId().equals(apply.getMemberId())){
            throw new BusinessLogicException(ExceptionCode.NO_PERMISSION);
        }
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime deadline = LocalDateTime.parse(crewing.getDeadLine(), DateTimeFormatter.ISO_DATE_TIME);
        if(now.isAfter(deadline)){
            throw new BusinessLogicException(ExceptionCode.CREWING_IS_CLOSED);
        }
        int currentPeople = crewingMembersRepository.countByCrewing(crewing);

        if(crewing.getMaxPeople() >= currentPeople){
            applyCrewing(crewingId, apply.getMemberId(),crewing, member, currentPeople);
        } else {
            throw new BusinessLogicException(ExceptionCode.CREWING_IS_MAX);
        }
    }
    public void applyCrewing(long crewingId, long memberId, Crewing crewing, Member member, int currentPeople){
        CrewingMembers existApply = crewingMembersRepository.findByMemberAndCrewing(member, crewing);
        if(existApply!=null){
            crewingMembersRepository.delete(existApply);
            currentPeople--;
        } else if(!crewing.isCompleted()){
            CrewingMembers.CrewingMemberId crewingMemberId = new CrewingMembers.CrewingMemberId();
            crewingMemberId.setCrewingId(crewingId);
            crewingMemberId.setMemberId(memberId);
            CrewingMembers crewingMembers = new CrewingMembers();
            crewingMembers.setCrewing(crewing);
            crewingMembers.setMember(member);
            crewingMembers.setId(crewingMemberId);
            crewingMembersRepository.save(crewingMembers);
            currentPeople++;
        } else {
            throw new BusinessLogicException(ExceptionCode.CREWING_IS_MAX);
        }
        crewing.setCurrentPeople(currentPeople);
        if(crewing.getMaxPeople()==currentPeople){
            crewing.setCompleted(true);
        } else if(crewing.isCompleted() && crewing.getMaxPeople()>currentPeople){
            crewing.setCompleted(false);
        }
    }

    /** 게시글 조회 */
    public CrewingDto.ResponseDto getCrewing(long crewingId) {
        Crewing findCrewing = findVerifiedCrewing(crewingId);
        List<CrewingMembers> crewingMembers = crewingMembersRepository.findByCrewing(findCrewing);
        List<Member> Members = crewingMembers.stream()
                .map(crewingMember -> crewingMember.getMember())
                .distinct()
                .collect(Collectors.toList());
        List<CrewingDto.Members> CrewingMember = new ArrayList<>();
        for(Member member : Members){
            CrewingDto.Members members = new CrewingDto.Members();
            members.setUserName(member.getUserName());
            members.setImageUrl(member.getImageUrl());
            CrewingMember.add(members);
        }
        CrewingDto.ResponseDto Response = crewingmapper.crewingToCrewingResponse(findCrewing);
        Response.setMembers(CrewingMember);
        return Response;
    }

    /** 게시글 전체 조회 */
    public Page<Crewing> getCrewings(Pageable pageable) {
        return crewingRepository.findAll(pageable);
    }

    /** 활동지역별 게시글 전체 조회 */
    public Page<Crewing> getCrewingsByActivityArea(String activityArea, Pageable pageable) {
        return crewingRepository.findByActivityArea(activityArea, pageable);
    }

    public Page<Crewing> getCrewingsByActivityAreaAndIdLessThan(String activityArea, Long lastCrewingId, Pageable pageable) {
        return crewingRepository.findByActivityAreaAndCrewingIdLessThan(activityArea, lastCrewingId, pageable);
    }

    /** 게시글 삭제 */
    public void deleteCrewing(long crewingId) {
        Crewing findCrewing = findVerifiedCrewing(crewingId);
        /** JWT토큰정보를 이용한 사용자 인증 */
        /*String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        if (!findPost.getMember().getEmail().equals(principal))
            throw new BusinessLogicException(ExceptionCode.NO_PERMISSION);*/
        crewingRepository.deleteById(crewingId);
    }

    public MultiResponseDto getMyCrewings(Member member, int page, int size, Long lastPostId){
        Pageable pageRequest = PageRequest.of(page-1, size, Sort.by("createdAt").descending());
        Page<Crewing> findPage;
        if(lastPostId == null){
            findPage = crewingRepository.findByMember(member,pageRequest);
        } else {
            findPage = crewingRepository.findByMemberAndCrewingIdLessThan(member, lastPostId, pageRequest);
        }
        List<Crewing> listCrewing = findPage.getContent();
        PageInfo pageInfo = new PageInfo(page,findPage.getSize(),findPage.getTotalElements(),findPage.getTotalPages(), findPage.hasNext());
        List<CrewingDto.ResponseDto> responseDto = crewingmapper.crewingListToCrewingResponseList(listCrewing);
        return new MultiResponseDto(responseDto,pageInfo);
    }

    /** 게시글 존재하는지 확인 */
    public Crewing findVerifiedCrewing(long crewingId) {
        Optional<Crewing> optionalCrewing = crewingRepository.findByCrewingId(crewingId);
        Crewing findCrewing = optionalCrewing.orElseThrow(()
                -> new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));
        return findCrewing;
    }

    public Page<Crewing> getCrewingsByIdLessThan(Long lastCrewingId, Pageable pageable) {
        return crewingRepository.findByCrewingIdLessThan(lastCrewingId, pageable);
    }

}
