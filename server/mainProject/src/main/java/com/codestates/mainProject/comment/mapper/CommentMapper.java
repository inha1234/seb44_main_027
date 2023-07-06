package com.codestates.comment.mapper;

import com.codestates.mainProject.comment.dto.CommentDto;
import com.codestates.mainProject.comment.entity.Comment;
import org.mapstruct.Mapper;


@Mapper(componentModel = "spring")
public interface CommentMapper {
//    Comment commentPostToComment(CommentDto.Post requestBody);

    default Comment commentPostToComment(CommentDto.Post commentPostDto) {

        return null;
    }
    Comment commentPutToComment(CommentDto.Put requestBody);

//    CommentDto.Response commentToCommentResponse(Comment comment);

    default CommentDto.Response CommentToCommentResponse (Comment comment) {

        return null;
    }
}
