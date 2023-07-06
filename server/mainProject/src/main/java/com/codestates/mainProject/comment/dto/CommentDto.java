package com.codestates.mainProject.comment.dto;

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
    public static class PostDto {
        @Positive
        private long memberId;

        @Positive
        private long postId;
//
//        @Positive
//        private long crewingId;

        @NotBlank(message = "댓글 내용은 필수로 기입해야합니다.")
        private String content;

        public Member getMember() {
            Member member = new Member();
            member.setMemberId(memberId);
            return member;
        }

        public Post getPost() {
            Post post = new Post();
            post.setPostId(postId);
            return post;
        }

//        public Crewing getCrewing() {
//            Crewing crewing = new Crewing();
//            crewing.setCrewingId(crweingId);
//            return crewing;
//        }

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
//        private long crewingId;
        private String content;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;

        public void setMember(Member member) {
            this.memberId = member.getMemberId();
        }

        public void setPost(Post post) {
            this.postId = post.getPostId();
        }

//        public void setCrewing(Crewing crewing) {
//            this.crewingId = crewing.getCrewingId();
//        }
    }
}
