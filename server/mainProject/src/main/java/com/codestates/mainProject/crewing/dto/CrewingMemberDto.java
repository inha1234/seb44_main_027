package com.codestates.mainProject.crewing.dto;

import com.codestates.mainProject.crewing.entity.Crewing;
import com.codestates.mainProject.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class CrewingMemberDto {

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response {
        private String userName;
        private String imageUrl;
        private long memberId;

        public void setMember(Member member) {
            this.userName = member.getUserName();
            this.imageUrl = member.getImageUrl();
            this.memberId = member.getMemberId();
        }

    }
}
