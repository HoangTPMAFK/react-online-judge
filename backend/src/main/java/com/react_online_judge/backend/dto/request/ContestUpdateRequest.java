package com.react_online_judge.backend.dto.request;

import com.mongodb.lang.Nullable;
import com.react_online_judge.backend.entity.Problem;
import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.util.Set;

public class ContestUpdateRequest {
    String title;
    String password; // Null if public
    LocalDateTime startAt;
    LocalDateTime endAt;
    Set<Problem> problems;
    String detail;
}
