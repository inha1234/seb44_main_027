package com.codestates.mainProject.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "member not found"),
    MEMBER_EXIST(409, "member exists"),
    USERNAME_EXIST(409,"username exists"),
    INVALID_REQUEST(400,"Invalid Request"),
    POST_NOT_FOUND(404, "post not found"),
    CREWING_NOT_FOUND(404, "crewing not found"),
    COMMENT_NOT_FOUND(404, "comment not found"),
    NO_PERMISSION(403, "you have no permission"),
    FOLLOW_NOT_FOUND(404, "follow not found"),
    FOLLOW_SAME_ID(409, "FollowerId and FollowingId cannot be the same"),
    FOLLOW_EXIST(409, "follow exists"),
    UPLOAD_FAIL(401, "s3 file upload failed"),
    DOWNLOAD_FAIL(401, "s3 file download failed"),
    CATEGORY_NOT_FOUND(404, "category not found");


    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
