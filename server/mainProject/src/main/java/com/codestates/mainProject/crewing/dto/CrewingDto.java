package com.codestates.mainProject.crewing.dto;

import com.codestates.mainProject.comment.dto.CommentDto;
import com.codestates.mainProject.validator.GreaterThan;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import javax.validation.constraints.PositiveOrZero;
import java.time.LocalDateTime;
import java.util.List;

public class CrewingDto {
    @Getter
    @Setter
    @AllArgsConstructor
    public static class RequestDto { // POST, PUT Dto
        @NotBlank(message = "크루잉모집 제목을 입력하세요")
        private String title;

        @NotBlank(message = "크루잉모집 내용을 입력하세요")
        private String content;

        @Positive(message = "크루잉모집 최대인원을 입력하세요")
        private int maxPeople;

        private boolean maxLimit;

        @PositiveOrZero(message = "회원 ID는 0 또는 양수 값이어야 합니다.")
        private long memberId;

        @NotBlank(message = "게시글 사진주소를 입력하세요")
        private String imageUrl;

        @NotBlank(message = "크루잉활동 날짜를 입력하세요")
        private String activityDate;

        @NotBlank(message = "크루잉모집 마감일을 입력하세요")
        private String deadLine;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class ResponseDto {
        private long memberId;

        private String userName;

        private String userImageUrl;

        private long crewingId;

        private String title;

        private String content;

        private int maxPeople;

        private int currentPeople;

        private boolean maxLimit;

        private boolean isCompleted;

        private String  imageUrl;

        private String activityDate;

        private String deadLine;

        private LocalDateTime createdAt;

        private LocalDateTime modifiedAt;

        private List<CommentDto.Response> comments;
    }
}
