package com.react_online_judge.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SubmissionRequest {
    @NotNull
    Long userId;

    @NotNull
    Long problemId;

    @NotBlank
    String sourceCode;

    @NotBlank
    String language;
}
