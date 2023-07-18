package com.codestates.mainProject.crewing.entity;

import com.codestates.mainProject.audit.Auditable;
import com.codestates.mainProject.member.entity.Member;
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
    private CrewingMemberId id = new CrewingMemberId();

    @MapsId("crewingId")
    @ManyToOne
    @JoinColumn(name = "crewing_id")
    private Crewing crewing;

    @MapsId("memberId")
    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;


    // 복합 기본키 클래스
    @Embeddable
    @Getter
    @Setter
    public static class CrewingMemberId implements Serializable {
        @Column(name = "crewing_id")
        private long crewingId;

        @Column(name = "member_id")
        private long memberId;
    }
}
