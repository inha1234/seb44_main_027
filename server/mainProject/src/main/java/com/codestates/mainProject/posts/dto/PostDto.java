package com.codestates.mainProject.posts.dto;

import lombok.*;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class PostDto {
    @Getter
    @Setter
    @AllArgsConstructor
    public static class Post {
        @NotBlank(message = "공유하고 싶은 활동의 제목을 입력하세요")
        private String title;

        @NotBlank(message = "공유하고 싶은 활동 내용을 입력하세요")
        private String content;

        @NotBlank(message = "게시글 카테고리를 입력하세요")
        private String category;

        @NotBlank(message = "게시글 사진주소를 입력하세요")
        private String imageUrl;

    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Put {
        @NotBlank(message = "수정할 제목을 입력하세요")
        private String title;

        @NotBlank(message = "수정할 내용을 입력하세요")
        private String content;

        @NotBlank(message = " 카테고리를 입력하세요")
        private String category;

        @NotBlank(message = "수정할 사진주소를 입력하세요")
        private String imageUrl;
    }

    @Builder
    public static class Response {
        private String title;

        private String content;

        private String category;

        private String  imageUrl;
    }
}
