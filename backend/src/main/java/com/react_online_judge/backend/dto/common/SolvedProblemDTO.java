package com.react_online_judge.backend.dto.common;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SolvedProblemDTO {
    long id;
    long problemId;
    String problemTitle;
    long userId;
    String username;
    int point;
}
