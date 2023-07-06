package com.codestates.mainProject.domain.member.entity;

import com.codestates.mainProject.advice.audit.Auditable;
import com.codestates.mainProject.comment.entity.Comment;
import com.codestates.mainProject.follow.entity.Follow;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "members")
@Getter
@Setter
@NoArgsConstructor
public class Member extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;
    @Email(message = "이메일 형식이 아닙니다.")
    @NotBlank
    @Column(unique = true, length = 100)
    private String email;
    @Size(max = 8, message = "유저 네임은 8글자를 넘길 수 없습니다.")
    @NotBlank
    private String username;
    @NotBlank
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[A-Za-z])(?=.*[@#$%^&+=`~!*()_;'|-])(?=\\S+$).{8,100}$", message = "비밀번호는 영문, 숫자, 특수문자를 포함하여 8자리 이상이여야 합니다.")
    private String password;
    @Column(name = "activity_area", length = 100)
    private String activityArea;
    private boolean active = true;
//    private String ImageUrl;

//    @OneToMany(mappedBy = "member") // 댓글과 유저는 단방향 매핑이라 필요 없는 부분일수도
//    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "follower")
    @JsonIgnore
    private List<Follow> followers = new ArrayList<>();

    @OneToMany(mappedBy = "following")
    @JsonIgnore
    private List<Follow> following = new ArrayList<>();

}
