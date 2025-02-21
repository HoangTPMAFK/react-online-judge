package com.react_online_judge.backend.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SubmissionResponse {
    Long id;
    Long userId;
    Long problemId;
    String sourceCode;
    String result;
    LocalDateTime submitTime;
    String language;
}
