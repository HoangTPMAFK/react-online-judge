package com.react_online_judge.backend.enums;

import lombok.Getter;

@Getter
public enum Result {
    ACCEPTED("Accepted"),
    WRONG_ANSWER("Wrong Answer"),
    TIME_LIMIT_EXCEEDED("Time Limit Exceeded"),
    MEMORY_LIMIT_EXCEEDED("Memory Limit Exceeded"),
    RUNTIME_ERROR("Runtime Error"),
    COMPILATION_ERROR("Compilation Error"),
    PENDING("Pending"),
    JUDGING("Judging");

    private final String value;

    Result(String value) {
        this.value = value;
    }
}
