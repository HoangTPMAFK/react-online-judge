package com.react_online_judge.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AnnouncementRequest {
    @NotBlank
    String title;

    @NotBlank
    LocalDateTime createAt;

    @NotBlank
    String author;

    @NotBlank
    String href;
}
