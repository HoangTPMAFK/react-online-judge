package com.react_online_judge.backend.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.react_online_judge.backend.validation.PasswordConfirm;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@PasswordConfirm
public class AccountCreationRequest {
    @Size(min = 6, message = "Password must be at least 6 characters")
    @NotBlank
    String name;

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

    @Past(message = "Date of birth must be in the past")
    @JsonFormat(shape = JsonFormat.Shape.NUMBER)
    Date dob;

    String avatar = "avatar.png";

    String gender;
}

