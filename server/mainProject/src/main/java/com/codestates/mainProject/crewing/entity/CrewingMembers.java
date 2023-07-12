package com.codestates.mainProject.crewing.entity;

import com.codestates.mainProject.audit.Auditable;
import com.codestates.mainProject.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class CrewingMembers extends Auditable {
    @EmbeddedId
    private CrewingMemberId id;

    @ManyToOne
    @JoinColumn(name = "crewing_id", insertable = false, updatable = false)
    private Crewing crewing;

    @ManyToOne
    @JoinColumn(name = "member_id", insertable = false, updatable = false)
    private Member member;

    private int currentPeople;

    private boolean maxLimit;

    // 복합 기본키 클래스
    @Embeddable
    public static class CrewingMemberId implements Serializable {
        @Column(name = "crewing_id")
        private int crewingId;

        @Column(name = "member_id")
        private int memberId;
    }
}
