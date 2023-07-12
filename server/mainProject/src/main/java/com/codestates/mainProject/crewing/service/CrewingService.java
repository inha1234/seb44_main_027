package com.codestates.mainProject.crewing.service;

import com.codestates.mainProject.crewing.dto.CrewingDto;
import com.codestates.mainProject.crewing.entity.Crewing;
import com.codestates.mainProject.crewing.entity.CrewingMembers;
import com.codestates.mainProject.crewing.mapper.CrewingMapper;
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

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CrewingService {
    private final CrewingRepository crewingRepository;

    private final MemberRepository memberRepository;
    private final CrewingMapper mapper;

    public CrewingService(CrewingRepository crewingRepository, MemberRepository memberRepository, CrewingMapper mapper) {
        this.crewingRepository = crewingRepository;
        this.memberRepository = memberRepository;
        this.mapper = mapper;
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
        crewing.addCrewingMembers(crewingMember);
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

    /** 게시글 조회 */
    public Crewing getCrewing(long crewingId) {
        Crewing findCrewing = findVerifiedCrewing(crewingId);

        return findCrewing;
    }

    /** 게시글 전체 조회 */
    public Page<Crewing> getCrewings(Pageable pageable) {
        return crewingRepository.findAll(pageable);
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
        List<CrewingDto.ResponseDto> responseDto = mapper.crewingListToCrewingResponseList(listCrewing);
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
