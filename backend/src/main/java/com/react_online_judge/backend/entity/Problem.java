package com.react_online_judge.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Problem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @Column(nullable = false, unique = true)
    String title;
    String statement;
    int point;
    Boolean isPublic;
    int timeLimit;
    int memoryLimit;
    String difficult;
    String input;
    String output;
    String sample_input_output; // JSON string
    @OneToMany
    Set<Submission> totalSubmissions;
}
