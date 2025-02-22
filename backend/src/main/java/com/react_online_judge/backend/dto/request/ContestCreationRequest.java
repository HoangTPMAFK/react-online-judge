package com.react_online_judge.backend.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.react_online_judge.backend.entity.Problem;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ContestCreationRequest {
    @NotBlank
    String title;

    String password; // Null if public

    @NotNull
    LocalDateTime startAt;

    @NotNull
    LocalDateTime endAt;

    Set<String> problems;
    String detail;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS")
    LocalDateTime createAt;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS")
    LocalDateTime updateAt;
}
