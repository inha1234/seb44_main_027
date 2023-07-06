package com.codestates.mainProject.follow.entity;

import com.codestates.mainProject.member.entity.Member;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
@NoArgsConstructor
@Getter
@Setter
@Entity
@IdClass(FollowKey.class)
public class Follow {
    @Id
    @Column(name = "FOLLOWER_ID")
    private long followerId;

    @Id
    @Column(name = "following_id")
    private long followingId;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "FOLLOWER_ID", insertable = false, updatable = false)
    private Member follower;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "FOLLOWING_ID", insertable = false, updatable = false)
    private Member following;
}
