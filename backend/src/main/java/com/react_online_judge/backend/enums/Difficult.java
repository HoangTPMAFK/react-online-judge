package com.react_online_judge.backend.enums;

import lombok.*;

@Getter
public enum Difficult {
    EASY("Easy"),
    MEDIUM("Medium"),
    HARD("Hard")
    ;

    private String value;
    Difficult(String value) {
        this.value = value;
    }
}
