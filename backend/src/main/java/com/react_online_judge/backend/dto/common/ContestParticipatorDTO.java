package com.react_online_judge.backend.dto.common;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ContestParticipatorDTO {
    long id;
    long contestId;
    String contestTitle;
    long userId;
    String username;
    int point;
}
