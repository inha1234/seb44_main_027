package com.codestates.comment.controller;

import com.codestates.mainProject.comment.dto.CommentDto;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/comments")
@Validated
public class CommentController {
    @PostMapping("/{comment-id}")
    public ResponseEntity postComment(@Valid @RequestBody CommentDto.Post commentPostDto) {

        return null;
    }


    @GetMapping
    public String getComment() {
        return "comments is works";
    }

    @PutMapping("/{comment-id}")
    public ResponseEntity putComment(@Valid @PathVariable("comment-id") long commentId,
                                     @Valid @RequestBody CommentDto.Put commentPutDto) {

        return null;
    }

    @DeleteMapping("/{comment-id}")
    public ResponseEntity deleteComment(@Valid @PathVariable("comment-id") long commentId) {

        return null;
    }
}
