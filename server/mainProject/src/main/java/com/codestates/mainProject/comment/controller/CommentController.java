package com.codestates.comment.controller;

import com.codestates.mainProject.comment.dto.CommentDto;
import com.codestates.mainProject.comment.entity.Comment;
import com.codestates.mainProject.comment.mapper.CommentMapper;
import com.codestates.mainProject.comment.service.CommentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/comments")
@Validated
public class CommentController {
    private final CommentService commentService;
    private final CommentMapper mapper;

    public CommentController(CommentService commentService, CommentMapper mapper) {
        this.commentService = commentService;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity postComment(@Valid @RequestBody CommentDto.Post commentPostDto) {
        Comment comment = commentService.createComment(mapper.commentPostToComment(commentPostDto));

        return new ResponseEntity<>(HttpStatus.CREATED);
    }


    @GetMapping
    public String getComment() {
        return "comments is works";
    }

    @PutMapping("/{comment-id}")
    public ResponseEntity putComment(@Valid @PathVariable("comment-id") long commentId,
                                     @RequestHeader("Authorization") String authToken,
                                     @Valid @RequestBody CommentDto.Put commentPutDto) {
        commentPutDto.setCommentId(commentId);
        long memberId = extractMemberIdFromAuthToken(authToken); // 헤더에 있는 토큰에서 memberId를 추출하는 메소드
        Comment comment = commentService.updateComment(memberId, mapper.commentPutToComment(commentPutDto));


        return new ResponseEntity<>(mapper.CommentToCommentResponse(comment), HttpStatus.OK);
    }

    @DeleteMapping("/{comment-id}")
    public ResponseEntity deleteComment(@Valid @PathVariable("comment-id") long commentId,
                                        @RequestHeader("Authorization") String authToken) {

        long memberId = extractMemberIdFromAuthToken(authToken);

        commentService.deleteComment(memberId, commentId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    private Long extractMemberIdFromAuthToken(String authToken) {


        return null;
    }
}
