package com.react_online_judge.backend.mapper;

import com.react_online_judge.backend.dto.request.UserCreationRequest;
import com.react_online_judge.backend.dto.request.UserUpdateRequest;
import com.react_online_judge.backend.dto.response.UserResponse;
import com.react_online_judge.backend.entity.Role;
import com.react_online_judge.backend.entity.User;
import com.react_online_judge.backend.repository.RoleRepository;
import org.mapstruct.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, uses = {UserMapperHelper.class})
public interface UserMapper {
    @Mapping(target = "roles", source = "roles", qualifiedByName = "mapStringsToRoles")
    User toUser(UserCreationRequest request);

    @Mapping(target = "roles", source = "roles", qualifiedByName = "mapRolesToStrings")
    UserResponse toUserResponse(User user);

    List<UserResponse> toUserResponseList(List<User> users);

    @Mapping(target = "roles", source = "roles", qualifiedByName = "mapStringsToRoles")
    void updateUser(@MappingTarget User user, UserUpdateRequest request);
}

@Component
class UserMapperHelper {
    @Autowired
    RoleRepository roleRepository;

    @Named("mapRolesToStrings")
    Set<String> mapRolesToStrings(Set<Role> roles) {
        if (roles == null) return new HashSet<>();
        return roles.stream().map(Role::getName).collect(Collectors.toSet());
    }

    @Named("mapStringsToRoles")
    Set<Role> mapStringsToRoles(Set<String> roleNames) {
        if (roleNames == null) return new HashSet<>();
        return roleNames.stream()
                .map(roleRepository::findRoleByName)
                .filter(Optional::isPresent)
                .map(Optional::get)
                .collect(Collectors.toSet());
    }
}
