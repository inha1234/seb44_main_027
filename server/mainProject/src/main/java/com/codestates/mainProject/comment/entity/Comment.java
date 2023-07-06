package com.codestates.comment.entity;

import com.codestates.mainProject.audit.Auditable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Comment extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long commentId;

    @Column(nullable = false)
    private String content;
//    @ManyToOne
//    @JoinColumn(name = "MEMBER_ID")
//    private Member member;
//    @ManyToOne
//    @JoinColumn(name = "POST_ID")
//    private Post post;
//    @ManyToOne
//    @JoinColumn(name = "CREWING_ID")
//    private Crewing crewing;
}
