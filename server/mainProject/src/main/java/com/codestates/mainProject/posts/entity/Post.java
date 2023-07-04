package com.codestates.mainProject.posts.entity;

import com.codestates.mainProject.audit.Auditable;
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

    /* Image Upload, Download
    @Column(nullable = false)
    private String imageUrl;
    */

    /* JPA Entity Mapping
    @OneToMany
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne(mappedBy = "post", cascade = {CascadeType.ALL})
    private List<Comment> comments = new ArrayList<>();

    public void addComment(Comment comment){
        this.comments.add(comment);
    }
    */
}
