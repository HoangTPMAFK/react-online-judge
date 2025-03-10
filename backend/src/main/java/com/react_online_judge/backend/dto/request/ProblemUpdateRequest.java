package com.react_online_judge.backend.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProblemUpdateRequest {
    String title;
    String statement;
    int point;
    boolean publicFlag;
    int timeLimit;
    int memoryLimit;
    String difficult;
    String input;
    String output;
    String sampleInputOutput;
    String hiddenInputOutput;// JSON string
    LocalDateTime updateAt = LocalDateTime.now();
}
