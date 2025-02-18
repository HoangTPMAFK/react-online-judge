package com.react_online_judge.backend.enums;

import lombok.Getter;

@Getter
public enum Language {
    CPP("cpp"),
    JAVA("java"),
    PYTHON("python")
    ;
    private String value;
    Language(String value) {
        this.value = value;
    }
}
