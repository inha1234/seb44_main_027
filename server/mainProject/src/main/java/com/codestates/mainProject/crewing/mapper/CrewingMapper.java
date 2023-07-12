package com.codestates.mainProject.crewing.mapper;

import com.codestates.mainProject.crewing.dto.CrewingDto;
import com.codestates.mainProject.crewing.entity.Crewing;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "Spring")
public interface CrewingMapper {

    @Mapping(target = "crewingId", ignore = true)
    @Mapping(target = "member.memberId", source = "memberId")
    Crewing crewingRequestToCrewing(CrewingDto.RequestDto crewingRequest);/** CrewingDto.Request(POST, PUT) 객체를 Crewing 엔티티로 매핑 */

    @Mapping(target = "memberId", source = "member.memberId")
    @Mapping(target = "userName", source = "member.userName")
    @Mapping(target = "userImageUrl", source = "member.imageUrl")
    @Mapping(target = "createdAt", source = "createdAt")
    @Mapping(target = "modifiedAt", source = "modifiedAt")
    CrewingDto.ResponseDto crewingToCrewingResponse(Crewing crewing); /** Crewing 엔티티를 CrewingDto.Response 으로 매핑 */

    default List<CrewingDto.ResponseDto> crewingListToCrewingResponseList(List<Crewing> crewings) {
        return crewings.stream()
                .map(this::crewingToCrewingResponse)
                .collect(Collectors.toList());
    }
}
