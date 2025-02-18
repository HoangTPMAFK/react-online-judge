package com.react_online_judge.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Submission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    Long userId;
    Long problemId;
    String result;
    LocalDateTime submitTime;
    String language;
}
