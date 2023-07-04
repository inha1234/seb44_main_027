package com.codestates.mainProject.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

public class MemberDto {
    @Getter
    @AllArgsConstructor
    public static class Post{
        @Email
        @NotBlank
        private String email;
        @Size(max = 8)
        @NotBlank
        private String username;
        @NotBlank
        @Pattern(regexp = "^(?=.*[0-9])(?=.*[A-Za-z])(?=.*[@#$%^&+=`~!*()_;'|-])(?=\\S+$).{8,}$", message = "비밀번호는 영문, 숫자, 특수문자를 포함하여 8자리 이상이여야 합니다.")
        private String password;
        private String activityArea;

//        private String ImageUrl;
    }
    @Getter
    @Setter
    @AllArgsConstructor
    public static class Put{
        @Email
        @NotBlank
        private String email;
        @Size(max = 8)
        @NotBlank
        private String username;
        @NotBlank
        @Size(min = 8)
        private String password;
        private String activityArea;
//        private String ImageUrl;
    }
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response{
        private String email;
        private String username;
        private String activityArea;
//    private String ImageUrl;
        private LocalDateTime createdAt;
//수정일을 보여줘야함????
//        private LocalDateTime modifiedAt;
    }
}
