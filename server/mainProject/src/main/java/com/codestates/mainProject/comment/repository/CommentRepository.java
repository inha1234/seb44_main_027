package com.codestates.mainProject.comment.repository;

import com.codestates.mainProject.comment.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {

}
