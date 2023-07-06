package com.codestates.mainProject.follow.mapper;

import com.codestates.mainProject.follow.dto.FollowDto;
import com.codestates.mainProject.follow.entity.Follow;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface FollowMapper {
    Follow followPostDtoToFollow(FollowDto.Post requestBody);

    FollowDto.Response followToFollowResponse(Follow follow);
}
