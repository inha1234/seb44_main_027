package com.codestates.mainProject.crewing.repository;

import com.codestates.mainProject.crewing.entity.Crewing;
import com.codestates.mainProject.crewing.entity.CrewingMembers;
import com.codestates.mainProject.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CrewingMembersRepository extends JpaRepository<CrewingMembers, CrewingMembers.CrewingMemberId> {
    List<CrewingMembers> findByCrewing(Crewing crewing);
    CrewingMembers findByMemberAndCrewing(Member member, Crewing crewing);
    int countByCrewing(Crewing crewing);
}
