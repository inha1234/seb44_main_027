package com.codestates.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;

public class CommentDto {

    @Getter
    @AllArgsConstructor
    public static class Post {
        @Positive
        private long memberId;

        @Positive
        private long postId;

        @Positive
        private long crewingId;

        @NotBlank
        private String content;

    }

    @Getter
    @AllArgsConstructor
    public static class Put {
        private long commentId;
        private String content;
    }

    @Getter
    @AllArgsConstructor
    public static class Response {
        private long commentId;
        private long memberId;
        private long postId;
        private long crewingId;
        private String content;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
    }
}
