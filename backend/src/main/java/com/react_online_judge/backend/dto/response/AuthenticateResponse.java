package com.react_online_judge.backend.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AuthenticateResponse {
    String token;
    boolean isAuthenticated;
    UserResponse account;
}
