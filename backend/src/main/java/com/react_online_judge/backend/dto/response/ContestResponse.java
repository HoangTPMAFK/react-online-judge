package com.react_online_judge.backend.dto.response;

import com.react_online_judge.backend.entity.Problem;
import com.react_online_judge.backend.entity.User;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ContestResponse {
    long id;
    String title;
    String password; // Null if public
    LocalDateTime startAt;
    LocalDateTime endAt;
    Set<Problem> problems;
    Set<User> participatedUsers;
    String detail;
}
