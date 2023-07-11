package com.codestates.mainProject.member.entity;

import com.codestates.mainProject.audit.Auditable;
import com.codestates.mainProject.follow.entity.Follow;
import com.codestates.mainProject.posts.entity.Post;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
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
    @Column(unique = true)
    private String email;
    @Size(max = 8, message = "유저 네임은 8글자를 넘길 수 없습니다.")
    @NotBlank
    @Column(unique = true)
    private String userName;
    @NotBlank
    private String password;
    @Column(name = "activity_area")
    private String activityArea;
    private boolean active = true;
    private String imageUrl;
    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();
//    @OneToMany(mappedBy = "member") // 댓글과 유저는 단방향 매핑이라 필요 없는 부분일수도
//    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "follower")
    private List<Follow> followers = new ArrayList<>();

    @OneToMany(mappedBy = "following")
    private List<Follow> following = new ArrayList<>();
    @OneToMany(mappedBy = "member")
    private List<Post> posts = new ArrayList<>();

    public void addPost(Post post) {
        posts.add(post);
    }
}
