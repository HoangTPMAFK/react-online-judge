package com.react_online_judge.backend.dto.request;

import com.mongodb.lang.Nullable;
import com.react_online_judge.backend.entity.Problem;
import jakarta.persistence.Column;
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
public class ContestUpdateRequest {
    String title;
    String password; // Null if public
    LocalDateTime startAt;
    LocalDateTime endAt;
    Set<Problem> problems;
    String detail;
}
