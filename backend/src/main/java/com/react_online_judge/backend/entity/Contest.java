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
    long id;
    @Column(nullable = false, unique = true)
    String title;
    Long creatorId;
    String password; // Null if public
    LocalDateTime startAt;
    LocalDateTime endAt;
    @ManyToMany
    @JoinTable(
            name = "contest_problem",
            joinColumns = @JoinColumn(name = "contest_id"),
            inverseJoinColumns = @JoinColumn(name = "problem_id")
    )
    Set<Problem> problems;

    @OneToMany(mappedBy = "contest_id")
    Set<ContestParticipator> contestParticipators;

    String detail;
}
