package com.react_online_judge.backend.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AnnouncementResponse {
    String title;
    LocalDateTime createAt;
    String author;
    String href;
}
