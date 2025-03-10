package com.react_online_judge.backend.dto.request;

import com.react_online_judge.backend.validation.PasswordConfirm;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;
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
    @NotBlank(message = "Email cannot be blank")
    String email;

    @NotBlank(message = "First name cannot be blank")
    String fname;

    @NotBlank(message = "Last name cannot be blank")
    String lname;

    Set<String> roles;
    String avatar;
    @Past(message = "Date of birth must be in the past")
    Date dob;

    String gender;
}
