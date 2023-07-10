package com.codestates.mainProject.posts.entity;

import com.codestates.mainProject.audit.Auditable;
import com.codestates.mainProject.comment.entity.Comment;
import com.codestates.mainProject.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Post extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //
    private long postId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false, updatable = false)
    private String category;

    @Column(nullable = true)
    private long kcal = 0;

    /** 이미지 업로드, 다운로드 기능 미구현 */
    @Column(nullable = false)
    private String imageUrl;

    /* JPA Entity Mapping */
    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @OneToMany(mappedBy = "post", cascade = CascadeType.REMOVE)
    private List<Comment> comments = new ArrayList<>();

    /*
    @OneToMany(mappedBy = "post", cascade = {CascadeType.ALL})
    private List<Comment> comments = new ArrayList<>();

    public void addComment(Comment comment){
        this.comments.add(comment);
    }
    */
}
