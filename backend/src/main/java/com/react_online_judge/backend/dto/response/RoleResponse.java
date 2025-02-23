package com.react_online_judge.backend.dto.response;

import com.react_online_judge.backend.dto.common.PermissionDTO;
import com.react_online_judge.backend.entity.Permission;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RoleResponse {
    String name;
    String description;
    Set<PermissionDTO> permissions;
}
