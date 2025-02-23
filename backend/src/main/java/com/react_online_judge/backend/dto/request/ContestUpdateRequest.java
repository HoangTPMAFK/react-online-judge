package com.react_online_judge.backend.dto.request;

import com.react_online_judge.backend.entity.Problem;
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
public class ContestUpdateRequest {
    String title;
    String password; // Null if public
    LocalDateTime startAt;
    LocalDateTime endAt;
    Set<String> problems;
    String detail;
    LocalDateTime updateAt;
}
