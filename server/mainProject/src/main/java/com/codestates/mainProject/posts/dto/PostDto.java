package com.codestates.mainProject.posts.dto;

import lombok.*;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class PostDto {
    @Getter
    @Setter
    @AllArgsConstructor
    public static class Request { // POST, PUT Dto
        @NotBlank(message = "공유하고 싶은 활동의 제목을 입력하세요")
        private String title;

        @NotBlank(message = "공유하고 싶은 활동 내용을 입력하세요")
        private String content;

        @NotBlank(message = "게시글 카테고리를 입력하세요")
        private String category;

//        @NotBlank(message = "게시글 사진주소를 입력하세요")
//        private String imageUrl;
    }

    @Builder
    public static class Response {
        private long postId;

        private String title;

        private String content;

        private String category;

//        private String  imageUrl;

        private LocalDateTime createdAt;

        private LocalDateTime modifiedAt;
    }
}
