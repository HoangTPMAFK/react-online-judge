package com.react_online_judge.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Contest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @Column(nullable = false, unique = true)
    String title;
    String password; // Null if public
    LocalDateTime startAt;
    LocalDateTime endAt;
    @ManyToMany
    Set<Problem> problems;
    @ManyToMany
    Set<User> participatedUsers;
    String detail;
}
