package com.codestates.comment.entity;

import com.codestates.mainProject.advice.audit.Auditable;
import com.codestates.mainProject.domain.member.entity.Member;
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
    private Long commentId;

    @Column(nullable = false)
    private String content;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID", nullable = false)
    private Member member;

//    @ManyToOne
//    @JoinColumn(name = "POST_ID")
//    private Post post;
//    @ManyToOne
//    @JoinColumn(name = "CREWING_ID")
//    private Crewing crewing;
}
