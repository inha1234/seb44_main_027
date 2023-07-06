package com.codestates.mainProject.posts.mapper;

import com.codestates.mainProject.posts.entity.Post;
import com.codestates.mainProject.posts.dto.PostDto;
import com.codestates.mainProject.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface PostMapper {

    @Mapping(target = "postId", ignore = true)
    @Mapping(target = "member.memberId", source = "memberId")
    Post postRequestToPost(PostDto.RequestDto postRequest); /** PostDto.Request(POST, PUT) 객체를 Post 엔티티로 매핑 */


    @Mapping(target = "postId", source = "postId")
    @Mapping(target = "title", source = "title")
    @Mapping(target = "content", source = "content")
    @Mapping(target = "category", source = "category")
//    @Mapping(target = "imageUrl", source = "imageUrl")
    @Mapping(target = "createdAt", source = "createdAt")
    @Mapping(target = "modifiedAt", source = "modifiedAt")
    PostDto.ResponseDto postToPostResponse(Post post); /** Post 엔티티를 PostDto.Response 으로 매핑 */

    default List<PostDto.ResponseDto> postListToPostResponseList(List<Post> posts) {
        return posts.stream()
                .map(this::postToPostResponse)
                .collect(Collectors.toList());
    }
}
