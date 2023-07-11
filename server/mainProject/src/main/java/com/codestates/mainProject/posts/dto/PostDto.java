package com.codestates.mainProject.posts.dto;

import com.codestates.mainProject.comment.dto.CommentDto;
import com.codestates.mainProject.comment.entity.Comment;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.PositiveOrZero;
import java.time.LocalDateTime;
import java.util.List;

public class PostDto {
    @Getter
    @Setter
    @AllArgsConstructor
    public static class RequestDto { // POST, PUT Dto
        @NotBlank(message = "공유하고 싶은 활동의 제목을 입력하세요")
        private String title;

        @NotBlank(message = "공유하고 싶은 활동 내용을 입력하세요")
        private String content;

        @NotBlank(message = "게시글 카테고리를 입력하세요")
        private String category;

        private long kcal;

        @PositiveOrZero(message = "회원 ID는 0 또는 양수 값이어야 합니다.")
        private long memberId;

        @NotBlank(message = "게시글 사진주소를 입력하세요")
        private String imageUrl;
    }

    @Getter
    @Setter
    @NoArgsConstructor
//    @Builder
    public static class ResponseDto {
        private long memberId;

        private String userName;

        private String userImageUrl;

        private long postId;

        private String title;

        private String content;

        private String category;

        private long kcal;

        private String  imageUrl;

        private LocalDateTime createdAt;

        private LocalDateTime modifiedAt;

        private List<CommentDto.Response> comments;
    }
}
