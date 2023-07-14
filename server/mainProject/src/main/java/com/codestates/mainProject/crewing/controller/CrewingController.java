package com.codestates.mainProject.crewing.controller;

import com.codestates.mainProject.crewing.dto.CrewingDto;
import com.codestates.mainProject.crewing.entity.Crewing;
import com.codestates.mainProject.crewing.mapper.CrewingMapper;
import com.codestates.mainProject.crewing.service.CrewingService;
import com.codestates.mainProject.dto.MultiResponseDto;
import com.codestates.mainProject.dto.PageInfo;
import com.codestates.mainProject.dto.SingleResponseDto;
import com.codestates.mainProject.member.service.MemberService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/crewings")
@Validated
public class CrewingController {
    private final CrewingService crewingService;

    private final MemberService memberService;

    private final CrewingMapper mapper;

    public CrewingController(CrewingService crewingService, MemberService memberService, CrewingMapper mapper) {
        this.crewingService = crewingService;
        this.memberService = memberService;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity postCrewing(@Valid @RequestBody CrewingDto.RequestDto requestDto) {
        Crewing crewing = mapper.crewingRequestToCrewing(requestDto);
        Crewing createCrewing = crewingService.createCrewing(crewing);
//        CrewingDto.ResponseDto responseDto = mapper.crewingToCrewingResponse(createCrewing);
        return new ResponseEntity(HttpStatus.CREATED);
    }

    /**
     * 크루잉 신청 엔드포인트
     * crewingId를 사용하여 해당 크루잉 게시글을 조회
    */
    @PostMapping("/apply/{crewing_id}")
    public ResponseEntity applyCrewing(@PathVariable("crewingId") long crewingId) {
        Crewing crewing = crewingService.getCrewing(crewingId);

        /** 이미 모집이 마감되었다면 (Completed이 true인 경우) 하단 메시지와 함께 400(Bad Request) 응답을 반환 */
        if (crewing.isCompleted()) {
            return new ResponseEntity<>("This crewing is already full.", HttpStatus.BAD_REQUEST);
        }

        /** 모집 인원 제한이 없고 (maxLimit이 false인 경우) 모집마감일이 지났다면 하단 메시지와 함께 400(Bad Request) 응답은 반환 */
        if (!crewing.isMaxLimit()) {
            // maxLimit이 false인 경우, 무제한 모집인 경우
            LocalDateTime now = LocalDateTime.now();
            LocalDateTime deadline = LocalDateTime.parse(crewing.getDeadLine(), DateTimeFormatter.ISO_DATE_TIME);
            if (now.isAfter(deadline)) {
                return new ResponseEntity<>("The application deadline has passed.", HttpStatus.BAD_REQUEST);
            }
        }
        /** 현재 참여 인원이 최대 인원(maxPeople)에 도달한 경우, Completed을 true로 변경하고 크루잉을 업데이트한 후 하단 메시지와 함께 400(Bad Request) 응답을 반환 */
        else if (crewing.getCurrentPeople() >= crewing.getMaxPeople()) {
            crewing.setCompleted(true);
            crewingService.updateCrewing(crewing);
            return new ResponseEntity<>("This crewing is now closed.", HttpStatus.BAD_REQUEST);
        }

        /** 그 외의 경우, 현재 참여 인원을 1 증가시킨 후 크루잉을 업데이트하고 하단 메시지와 함께 200(OK) 응답을 반환 */
        crewing.setCurrentPeople(crewing.getCurrentPeople() + 1);
        crewingService.updateCrewing(crewing);

        return new ResponseEntity<>("You have successfully applied to the crewing.", HttpStatus.OK);
    }

    @PutMapping("/{crewing_id}")
    public ResponseEntity putCrewing(@PathVariable("crewing_id") @Positive long crewingId,
                                  @Valid @RequestBody CrewingDto.RequestDto requestDto) {
        Crewing crewing = mapper.crewingRequestToCrewing(requestDto);
        crewing.setCrewingId(crewingId);
        Crewing updateCrewing = crewingService.updateCrewing(crewing);

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.crewingToCrewingResponse(updateCrewing)),
                HttpStatus.OK);
    }

    @GetMapping("/{crewing_id}")
    public ResponseEntity getCrewing(@PathVariable("crewing_id") @Positive long crewingId) {
        Crewing crewing = crewingService.getCrewing(crewingId);
        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.crewingToCrewingResponse(crewing)),
                HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getPosts(@Positive @RequestParam(defaultValue = "1") int page,
                                   @RequestParam(required = false) Long lastCrewingId) {

        Pageable pageable = PageRequest.of(page - 1, 15, Sort.by("createdAt").descending());
        Page<Crewing> pageCrewings = (lastCrewingId != null) ?
                crewingService.getCrewingsByIdLessThan(lastCrewingId, pageable) :
                crewingService.getCrewings(pageable);

        List<CrewingDto.ResponseDto> responseDto = mapper.crewingListToCrewingResponseList(pageCrewings.getContent());
        PageInfo pageInfo =
                new PageInfo(page, 15, pageCrewings.getTotalElements(), pageCrewings.getTotalPages(), pageCrewings.hasNext());
        MultiResponseDto<CrewingDto.ResponseDto> multiResponseDto = new MultiResponseDto<>(responseDto, pageInfo);

        return new ResponseEntity<>(multiResponseDto, HttpStatus.OK);
    }

    @DeleteMapping("/{crewing_id}")
    public ResponseEntity deleteCrewing(@PathVariable("crewing_id") @Positive long crewingId) {
        crewingService.deleteCrewing(crewingId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

}
