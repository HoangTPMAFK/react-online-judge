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
    long id;

    String username;
    String fname;
    String lname;
    String password;
    String email;
    int point;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    Set<Submission> submissions;

    @OneToMany(mappedBy = "user_id")
    Set<ContestParticipator> contestParticipators;

    @ManyToMany(mappedBy = "users")
    Set<Role> roles;

    String avatar;
}
