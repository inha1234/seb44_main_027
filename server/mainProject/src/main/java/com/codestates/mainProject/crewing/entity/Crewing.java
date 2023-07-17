package com.codestates.mainProject.crewing.entity;

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
public class Crewing extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //
    private long crewingId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private int maxPeople;

    private int currentPeople;

    @Column(nullable = false)
    private boolean maxLimit;

    private boolean isCompleted;

    @Column(nullable = false)
    private String imageUrl;

    @Column(nullable = false)
    private String activityDate;

    @Column(nullable = false)
    private String deadLine;

    /* JPA Entity Mapping */
    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @Column(nullable = false)
    private String activityArea;

    @OneToMany(mappedBy = "crewing")
    private List<CrewingMembers> crewingMembers = new ArrayList<>();

    public void addCrewingMembers(CrewingMembers crewingMember) {
        crewingMembers.add(crewingMember);
    }

    @OneToMany(mappedBy = "crewing", cascade = CascadeType.ALL)
    private List<Comment> comments = new ArrayList<>();
}
