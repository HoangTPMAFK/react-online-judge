package com.react_online_judge.backend.dto.request;

import com.mongodb.lang.Nullable;
import com.react_online_judge.backend.entity.Problem;
import com.react_online_judge.backend.entity.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.util.Set;

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
