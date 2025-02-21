package com.react_online_judge.backend.dto.request;

import com.mongodb.lang.Nullable;
import com.react_online_judge.backend.entity.Problem;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ContestCreationRequest {
    @NotBlank
    String title;

    @Nullable
    String password; // Null if public

    @NotNull
    LocalDateTime startAt;

    @NotNull
    LocalDateTime endAt;

    Set<Problem> problems;
    String detail;
}
