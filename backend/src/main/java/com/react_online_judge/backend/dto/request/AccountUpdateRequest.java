package com.react_online_judge.backend.dto.request;

import com.react_online_judge.backend.validation.PasswordConfirm;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@PasswordConfirm
public class AccountUpdateRequest {
    String password;

    @Size(min = 8, message = "Password must be at least 8 characters")
    @NotBlank
    String newPassword;

    String confirmPassword;

    @Email(message = "Invalid email format")
    String email;

    String fname;
    String lname;
    Set<String> roles;
    String avatar;
    Date dob;
    String gender;
}
