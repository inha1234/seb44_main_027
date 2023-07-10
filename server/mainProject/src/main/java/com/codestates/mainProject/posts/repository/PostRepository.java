package com.codestates.mainProject.posts.repository;

import com.codestates.mainProject.member.entity.Member;
import com.codestates.mainProject.posts.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {
    Optional<Post> findByPostId(Long postId);
    Page<Post> findByCategory(String category, Pageable pageable);
    Page<Post> findByMember(Member member, Pageable pageable);
}
