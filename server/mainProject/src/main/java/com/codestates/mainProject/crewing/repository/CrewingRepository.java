package com.codestates.mainProject.crewing.repository;

import com.codestates.mainProject.crewing.entity.Crewing;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CrewingRepository extends JpaRepository<Crewing, Long> {
    Optional<Crewing> findByCrewingId(Long crewingId);
    Page<Crewing> findByCrewingIdLessThan(Long crewingId, Pageable pageable);

}
