package com.codestates.mainProject.domain.member.entity;

import com.codestates.mainProject.audit.Auditable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Entity(name = "members")
@Getter
@Setter
@NoArgsConstructor
public class Member extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long member_Id;
    @Email
    @NotBlank
    @Column(unique = true, length = 100)
    private String email;
    @Size(max = 8)
    @NotBlank
    private String username;
    @NotBlank
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[A-Za-z])(?=.*[@#$%^&+=`~!*()_;'|-])(?=\\S+$).{8,}$", message = "비밀번호는 영문, 숫자, 특수문자를 포함하여 8자리 이상이여야 합니다.")
    private String password;

    @Column(name = "activity_area", length = 100)
    private String activityArea;

    private boolean active = true;

//    private String ImageUrl;

}
