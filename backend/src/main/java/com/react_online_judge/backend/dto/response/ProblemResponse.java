package com.react_online_judge.backend.dto.response;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProblemResponse {
    long id;
    String title;
    String statement;
    int point;
    Boolean isPublic;
    int timeLimit;
    int memoryLimit;
    String difficult;
    String input;
    String output;
    String sample_input_output;
    String hidden_input_output;
}
