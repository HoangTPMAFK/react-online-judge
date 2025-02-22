package com.react_online_judge.backend.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
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
    String sampleInputOutput;
    String hiddenInputOutput;
}
