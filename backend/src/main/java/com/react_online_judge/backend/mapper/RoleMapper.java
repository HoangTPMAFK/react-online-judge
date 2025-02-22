package com.react_online_judge.backend.mapper;

import com.react_online_judge.backend.dto.common.PermissionDTO;
import com.react_online_judge.backend.dto.request.RoleCreationRequest;
import com.react_online_judge.backend.dto.request.RoleUpdateRequest;
import com.react_online_judge.backend.dto.response.RoleResponse;
import com.react_online_judge.backend.entity.Permission;
import com.react_online_judge.backend.entity.Role;
import com.react_online_judge.backend.repository.PermissionRepository;
import org.mapstruct.*;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, uses = {RoleMapperHelper.class})
public interface RoleMapper {
    @Mapping(target = "rolePermissions", source = "permissions", qualifiedByName = "mapStringsToPermissions")
    Role toRole(RoleCreationRequest request);

    @Mapping(target = "permissions", source = "rolePermissions", qualifiedByName = "mapPermissionsToPermissionDTOes")
    RoleResponse toRoleResponse(Role role);

    List<RoleResponse> toRoleResponseList(List<Role> roles);

    @Mapping(target = "rolePermissions", source = "permissions", qualifiedByName = "mapStringsToPermissions")
    void updateRole(@MappingTarget Role role, RoleUpdateRequest request);
}

@Component
class RoleMapperHelper {
    private final PermissionRepository permissionRepository;

    public RoleMapperHelper(PermissionRepository permissionRepository) {
        this.permissionRepository = permissionRepository;
    }

    @Named("mapStringsToPermissions")
    public Set<Permission> mapStringsToPermissions(Set<String> permissionNames) {
        if (permissionNames == null || permissionNames.isEmpty()) {
            return Collections.emptySet();
        }
        return permissionNames.stream()
                .map(permissionRepository::findByName)
                .map(opt -> opt.orElse(null)) // Tránh lỗi Optional.empty()
                .filter(Objects::nonNull) // Lọc ra phần tử null
                .collect(Collectors.toSet());
    }

    @Named("mapPermissionsToPermissions")
    public Set<Permission> mapPermissionsToPermissions(Set<Permission> permissions) {
        if (permissions == null || permissions.isEmpty()) {
            return Collections.emptySet();
        }
        return new HashSet<>(permissions);
    }

    @Named("mapPermissionsToPermissionDTOes")
    public Set<PermissionDTO> mapPermissionsToPermissionDTOes(Set<Permission> permissions) {
        if (permissions == null || permissions.isEmpty()) {
            return Collections.emptySet();
        }
        return permissions.stream()
                .map(p -> new PermissionDTO(p.getName(), p.getDescription()))
                .collect(Collectors.toSet());
    }
}
