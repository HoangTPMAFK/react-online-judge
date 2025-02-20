package com.react_online_judge.backend.dto.response;

import com.react_online_judge.backend.entity.Permission;

import java.util.Set;

public class RoleResponse {
    String name;
    String description;
    Set<Permission> permissions;
}
