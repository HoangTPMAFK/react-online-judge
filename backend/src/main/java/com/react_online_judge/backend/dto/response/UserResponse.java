package com.react_online_judge.backend.dto.response;

import com.react_online_judge.backend.entity.Role;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;
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
    Set<String> roles;
    String avatar;
    Date dob;
    Date create_at;
    String gender;
}
