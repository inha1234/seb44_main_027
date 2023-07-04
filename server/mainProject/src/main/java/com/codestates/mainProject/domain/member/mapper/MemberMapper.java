package com.codestates.mainProject.domain.member.mapper;

import com.codestates.mainProject.domain.member.dto.MemberDto;
import com.codestates.mainProject.domain.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface MemberMapper {
    @Mapping(target = "member_Id", ignore = true)
    @Mapping(target = "active", ignore = true)
    Member memberPostDtoToMember(MemberDto.Post memberPostDto);
    MemberDto.Response memberToMemberResponseDto(Member member);
}
