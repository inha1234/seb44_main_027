package com.codestates.mainProject.crewing.repository;

import com.codestates.mainProject.crewing.entity.Crewing;
import com.codestates.mainProject.crewing.entity.CrewingMembers;
import com.codestates.mainProject.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CrewingMembersRepository extends JpaRepository<CrewingMembers, CrewingMembers.CrewingMemberId> {
    CrewingMembers findByMemberAndCrewing(Member member, Crewing crewing);
    Page<CrewingMembers> findByMember(Member member, Pageable pageable);
    Page<CrewingMembers> findByMemberAndIdCrewingIdLessThan(Member member, Long idx, Pageable pageable);
    int countByCrewing(Crewing crewing);
}

//    Page<Crewing> findByMemberAndCrewingIdLessThan(Member member, Long idx, Pageable pageable); crewingId