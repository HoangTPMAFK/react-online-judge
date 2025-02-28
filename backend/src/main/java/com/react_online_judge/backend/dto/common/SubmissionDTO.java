package com.react_online_judge.backend.dto.common;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SubmissionDTO {
    long id;
    long problemId;
    String problemTitle;
    long userId;
    String username;
    String sourceCode; // input is the source code, save in database is the source path with id.language in problem submission folder
    String result;
    LocalDateTime submitTime;
    String language;
}
