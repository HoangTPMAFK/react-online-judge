package com.react_online_judge.backend.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {
    USER_NOT_EXISTED(301, "User not existed", HttpStatus.NOT_FOUND),
    PROBLEM_NOT_EXISTED(302, "Problem not existed", HttpStatus.NOT_FOUND),
    CONTEST_NOT_EXISTED(303, "Contest not existed", HttpStatus.NOT_FOUND),
    SUBMISSION_NOT_EXISTED(304, "Submission not existed", HttpStatus.NOT_FOUND),
    ROLE_NOT_EXISTED(305, "Role not existed", HttpStatus.NOT_FOUND),
    PERMISSION_NOT_EXISTED(306, "Permission not existed", HttpStatus.NOT_FOUND),
    USER_EXISTED(401, "User existed", HttpStatus.BAD_REQUEST),
    PROBLEM_EXISTED(402, "Problem existed", HttpStatus.BAD_REQUEST),
    CONTEST_EXISTED(403, "Contest existed", HttpStatus.BAD_REQUEST),
    ROLE_EXISTED(404, "Role existed", HttpStatus.BAD_REQUEST),
    PERMISSION_EXISTED(405, "Permission existed", HttpStatus.BAD_REQUEST),
    ALREADY_JOINED(406, "You already joined the contest", HttpStatus.BAD_REQUEST),
    INVALID_PASSWORD(407, "Invalid password", HttpStatus.BAD_REQUEST),
    UNAUTHORIZED(201, "You don't have permission", HttpStatus.FORBIDDEN),
    UNAUTHENTICATED(202, "Unauthenticated", HttpStatus.UNAUTHORIZED),
    WRONG_PASSWORD(203, "Wrong password", HttpStatus.BAD_REQUEST),
    UNCATEGORIZED(501, "Uncategorized exception", HttpStatus.INTERNAL_SERVER_ERROR),
    REQUEST_HEADER_MISSING(502, "Request header missing", HttpStatus.BAD_REQUEST),
    ;
    private int code;
    private String message;
    private HttpStatus httpStatus;
    ErrorCode(int code, String message, HttpStatus httpStatus) {
        this.code = code;
        this.message = message;
        this.httpStatus = httpStatus;
    }
}
