package com.react_online_judge.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProblemCreationRequest {
    String title;
    @NotBlank
    String statement;

    @NotNull
    int point;

    boolean publicFlag;

    @NotNull
    int timeLimit;

    @NotNull
    int memoryLimit;

    String difficult;
    @NotBlank
    String input;

    @NotBlank
    String output;

    @NotBlank
    String sampleInputOutput; // JSON string
    String hiddenInputOutput;
    LocalDateTime createAt = LocalDateTime.now();
}
