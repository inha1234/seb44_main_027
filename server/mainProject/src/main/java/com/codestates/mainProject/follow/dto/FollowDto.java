package com.codestates.mainProject.follow.dto;

import com.codestates.mainProject.advice.audit.Auditable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

public class FollowDto extends Auditable {

    @Getter
    @AllArgsConstructor
    public static class Post {
        @NotNull
        private Long followerId;

        @NotNull
        private Long followingId;
    }
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response {
        private long followerId;
        private long followingId;
        private LocalDateTime createdAt;
    }
}
