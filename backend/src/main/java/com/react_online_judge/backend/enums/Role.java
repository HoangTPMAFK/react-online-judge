package com.react_online_judge.backend.enums;

import lombok.Getter;

@Getter
public enum Role {
    USER("User", "Regular user with basic permissions"),
    ADMIN("Admin", "User with administrative privileges"),
    SUPER_ADMIN("Super Admin", "User with full system access");

    private final String name;
    private final String description;

    Role(String name, String description) {
        this.name = name;
        this.description = description;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }
}
