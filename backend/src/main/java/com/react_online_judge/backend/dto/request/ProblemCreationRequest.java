package com.react_online_judge.backend.dto.request;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

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
    Boolean isPublic;
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
    String sample_input_output; // JSON string
}
