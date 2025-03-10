package com.react_online_judge.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.Date;
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
    long id;

    @Column(nullable = false, unique = true)
    String title;

    String statement;
    int point;
    @Column(name = "is_public")
    boolean publicFlag;

    int timeLimit;
    int memoryLimit;
    String author;
    String difficult;
    String input;
    String output;
    String sampleInputOutput; // JSON string
    String hiddenInputOutput; // JSON string
    @OneToMany(mappedBy = "problem", cascade = CascadeType.ALL, orphanRemoval = true)
    Set<Submission> submissions;

    @OneToMany(mappedBy = "problem")
    Set<SolvedProblem> sovledUsers;

    @ManyToMany(mappedBy = "problems")
            @JsonIgnoreProperties("problems")
    Set<Contest> contests;

    LocalDateTime created_at;
    LocalDateTime updated_at;
}
