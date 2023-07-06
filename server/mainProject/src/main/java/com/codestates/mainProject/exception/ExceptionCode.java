package com.codestates.mainProject.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "member not found"),
    MEMBER_EXIST(409, "member exists"),
    POST_NOT_FOUND(404, "post not found"),
    CREWING_NOT_FOUND(404, "crewing not found"),
    COMMENT_NOT_FOUND(404, "comment not found"),
    NO_PERMISSION(401, "you have no permission"),
    FOLLOW_SAME_ID(409, "FollowerId and FollowingId cannot be the same"),
    FOLLOW_EXIST(409, "follow exists");


    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
