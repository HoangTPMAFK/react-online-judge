package com.react_online_judge.backend.mapper;

import com.react_online_judge.backend.dto.request.PermissionCreationRequest;
import com.react_online_judge.backend.dto.request.PermissionUpdateRequest;
import com.react_online_judge.backend.dto.response.PermissionResponse;
import com.react_online_judge.backend.entity.Permission;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PermissionMapper {
    Permission toPermission(PermissionCreationRequest request);
    PermissionResponse toPermissionResponse(Permission permission);
    List<PermissionResponse> toPermissionResponseList(List<Permission> permissions);
    void updatePermission(@MappingTarget Permission permission, PermissionUpdateRequest request);
}
