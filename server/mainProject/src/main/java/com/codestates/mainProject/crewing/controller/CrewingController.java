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
import org.springframework.http.*;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
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
    public ResponseEntity applyCrewing(@PathVariable("crewing_id") long crewingId, @RequestBody CrewingDto.applyDto apply) {
        String response = crewingService.canApply(crewingId, apply);
        return new ResponseEntity(response, HttpStatus.OK);
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
        CrewingDto.ResponseDto crewing = crewingService.getCrewing(crewingId);
        return new ResponseEntity<>(crewing, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getCrewings(@RequestParam(value = "activityArea", required = false) String activityArea,
                                   @Positive @RequestParam(defaultValue = "1") int page,
                                   @RequestParam(required = false) Long lastCrewingId) {

        Pageable pageable = PageRequest.of(page - 1, 15, Sort.by("createdAt").descending());

        Page<Crewing> pageCrewings;
        if (activityArea == null || activityArea.isEmpty()) {
            pageCrewings = (lastCrewingId != null) ?
                    crewingService.getCrewingsByIdLessThan(lastCrewingId, pageable) :
                    crewingService.getCrewings(pageable);
        } else {
            pageCrewings = (lastCrewingId != null) ?
                    crewingService.getCrewingsByActivityAreaAndIdLessThan(activityArea, lastCrewingId, pageable) :
                    crewingService.getCrewingsByActivityArea(activityArea, pageable);
        }

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
