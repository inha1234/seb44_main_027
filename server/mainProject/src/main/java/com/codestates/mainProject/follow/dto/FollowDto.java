package com.codestates.mainProject.follow.dto;

import com.codestates.mainProject.audit.Auditable;
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
        private long followerId;

        @NotNull
        private long followingId;
    }
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Members {
        private Long memberId;
        private String userName;
        private String imageUrl;
    }
}
