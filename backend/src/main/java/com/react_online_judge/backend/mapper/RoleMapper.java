package com.react_online_judge.backend.mapper;

import com.react_online_judge.backend.dto.request.RoleCreationRequest;
import com.react_online_judge.backend.dto.request.RoleUpdateRequest;
import com.react_online_judge.backend.dto.response.RoleResponse;
import com.react_online_judge.backend.entity.Role;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface RoleMapper {
    Role toRole(RoleCreationRequest request);
    RoleResponse toRoleResponse(Role role);
    List<RoleResponse> toRoleResponseList(List<Role> roles);
    void updateRole(@MappingTarget Role role, RoleUpdateRequest request);
}
