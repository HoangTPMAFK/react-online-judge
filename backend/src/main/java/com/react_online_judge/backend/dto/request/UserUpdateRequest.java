package com.react_online_judge.backend.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserUpdateRequest {
    @Size(min = 8, message = "Password must be at least 6 characters")
    String password;

    @Email(message = "Invalid email format")
    String email;

    String fname;
    String lname;
    Set<String> roles;
    String avatar;
}
