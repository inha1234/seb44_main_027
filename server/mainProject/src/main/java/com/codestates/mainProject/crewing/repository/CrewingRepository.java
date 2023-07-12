package com.codestates.mainProject.crewing.repository;

import com.codestates.mainProject.crewing.entity.Crewing;
import com.codestates.mainProject.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CrewingRepository extends JpaRepository<Crewing, Long> {
    Optional<Crewing> findByCrewingId(Long crewingId);
    Page<Crewing> findByCrewingIdLessThan(Long crewingId, Pageable pageable);
    Page<Crewing> findByMember(Member member, Pageable pageable);
    Page<Crewing> findByMemberAndCrewingIdLessThan(Member member, Long idx, Pageable pageable);
}
