package com.codestates.mainProject.follow.entity;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@AllArgsConstructor
@NoArgsConstructor
public class FollowKey implements Serializable {
    private long followerId;
    private long followingId;
}
