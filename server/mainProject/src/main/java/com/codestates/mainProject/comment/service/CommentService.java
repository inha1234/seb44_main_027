package com.codestates.mainProject.comment.service;

import com.codestates.mainProject.comment.entity.Comment;
import com.codestates.mainProject.comment.repository.CommentRepository;
import com.codestates.mainProject.member.entity.Member;
import com.codestates.mainProject.member.repository.MemberRepository;
import com.codestates.mainProject.exception.BusinessLogicException;
import com.codestates.mainProject.exception.ExceptionCode;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CommentService {
    private final CommentRepository commentRepository;
    private final MemberRepository memberRepository;

    public CommentService(CommentRepository commentRepository, MemberRepository memberRepository) {
        this.commentRepository = commentRepository;
        this.memberRepository = memberRepository;
    }

    public Comment createComment(Comment comment) {

        return commentRepository.save(comment);
    }

    public Comment updateComment(
//            long memberId,
            Comment comment) {
        Comment findComment = findVerifiedComment(comment.getCommentId());

//        if(!isAuthorized(memberId, comment.getCommentId())) {
//            throw new BusinessLogicException(ExceptionCode.NO_PERMISSION);
//        }

        Optional.ofNullable(comment.getContent())
                .ifPresent(content -> findComment.setContent(content));

        return commentRepository.save(findComment);
    }

    public void deleteComment(
//            long memberId,
            long commentId) {
        Comment findComment = findVerifiedComment(commentId);

//        if(!isAuthorized(memberId, commentId)) {
//            throw new BusinessLogicException(ExceptionCode.NO_PERMISSION);
//        }

        commentRepository.delete(findComment);
    }

    private Comment findVerifiedComment(long commentId) {
        Optional<Comment> optionalComment = commentRepository.findById(commentId);
        Comment findComment =
                optionalComment.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));

        return findComment;
    }

//    private boolean isAuthorized(long memberId, long commentId) {
//        Comment comment = commentRepository.findById(commentId)
//                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
//
//        return comment.getMember().getMemberId().equals(memberId);
//    }
}
