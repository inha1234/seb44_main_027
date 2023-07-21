package com.codestates.mainProject.comment.dto;

import com.codestates.mainProject.crewing.entity.Crewing;
import com.codestates.mainProject.member.entity.Member;
import com.codestates.mainProject.posts.entity.Post;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;

public class CommentDto {

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class PostDto {
        @Positive
        private long memberId;

        private Long postId;

        private Long crewingId;

        @NotBlank(message = "댓글 내용은 필수로 기입해야합니다.")
        private String content;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Put {
        private long commentId;
        private String content;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response {
        private long commentId;
        private long memberId;
        private long postId;
        private long crewingId;
        private String userName;
        private String imageUrl;
        private String content;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;

        public void setMember(Member member) {
            this.userName = member.getUserName();
            this.memberId = member.getMemberId();
            this.imageUrl = member.getImageUrl();
        }

        public void setPost(Post post) {
            if(post != null) {
                this.postId = post.getPostId();
            }
        }

        public void setCrewing(Crewing crewing) {
            if(crewing != null) {
                this.crewingId = crewing.getCrewingId();
            }
        }
    }
}
