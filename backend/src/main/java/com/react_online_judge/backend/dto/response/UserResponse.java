package com.react_online_judge.backend.dto.response;

import com.react_online_judge.backend.entity.Role;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserResponse {
    long id;
    String username;
    String email;
    Set<Role> roles;
}
