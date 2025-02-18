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
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String username;
    String fname;
    String lname;
    String password;
    String email;
    int solved;
    int submission;
    int point;
    @ManyToMany
    Set<Problem> solvedProblems;
    @ManyToMany
    Set<Contest> participatingContests;
    @ManyToMany
    Set<Role> roles;
}
