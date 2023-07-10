package com.codestates.mainProject.comment.controller;

import com.codestates.mainProject.authority.jwt.JwtTokenizer;
import com.codestates.mainProject.comment.dto.CommentDto;
import com.codestates.mainProject.comment.entity.Comment;
import com.codestates.mainProject.comment.mapper.CommentMapper;
import com.codestates.mainProject.comment.service.CommentService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
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
    public ResponseEntity postComment(@Valid @RequestBody CommentDto.PostDto commentPostDto) {
        Comment comment = commentService.createComment(mapper.commentPostToComment(commentPostDto));

        return new ResponseEntity<>(HttpStatus.CREATED);
    }


    @PutMapping("/{comment-id}")
    public ResponseEntity putComment(@Valid @PathVariable("comment-id") long commentId,
                                     @Valid @RequestBody CommentDto.Put commentPutDto) {
        commentPutDto.setCommentId(commentId);
        Comment comment = commentService.updateComment(mapper.commentPutToComment(commentPutDto));


        return new ResponseEntity<>(mapper.CommentToCommentResponse(comment), HttpStatus.OK);
    }

    @DeleteMapping("/{comment-id}")
    public ResponseEntity deleteComment(@Valid @PathVariable("comment-id") long commentId) {



        commentService.deleteComment(commentId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}
