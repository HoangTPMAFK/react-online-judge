package com.react_online_judge.backend.dto.request;

import jakarta.validation.constraints.NotBlank;

public class PermissionCreationRequest {
    @NotBlank
    String name;
    @NotBlank
    String description;
}
