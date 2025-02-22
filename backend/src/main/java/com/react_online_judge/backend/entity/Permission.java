package com.react_online_judge.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Permission {
    @Id
    String name;

    @Column(nullable = false, unique = true)
    String description;
    @ManyToMany(mappedBy = "rolePermissions")
    @JsonIgnoreProperties("rolePermissions")
    Set<Role> roles;
}
