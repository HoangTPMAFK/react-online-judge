package com.react_online_judge.backend.dto.common;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProblemDTO {
    long id;
    String title;
    String statement;
    int point;
    boolean publicFlag;
    int timeLimit;
    int memoryLimit;
    String author;
    String difficult;
    String input;
    String output;
    String sampleInputOutput; // JSON string
    String hiddenInputOutput; // JSON string

}
