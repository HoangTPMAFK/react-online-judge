package com.react_online_judge.backend.controller;

import com.mongodb.client.model.ValidationAction;
import com.react_online_judge.backend.dto.request.PermissionCreationRequest;
import com.react_online_judge.backend.dto.request.PermissionUpdateRequest;
import com.react_online_judge.backend.dto.response.APIResponse;
import com.react_online_judge.backend.dto.response.PermissionResponse;
import com.react_online_judge.backend.service.PermissionService;
import com.react_online_judge.backend.service.RoleService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/permission")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
public class PermissionController {
    RoleService roleService;
    PermissionService permissionService;
    @GetMapping("/")
    public APIResponse<List<PermissionResponse>> getAllPermissions() {
        return APIResponse.<List<PermissionResponse>>builder()
                .data(permissionService.getAllPermissions())
                .build();
    }
    @PostMapping(value = "/")
    public APIResponse<PermissionResponse> createPermission(@RequestBody PermissionCreationRequest request) {
        return APIResponse.<PermissionResponse>builder()
                .data(permissionService.createPermission(request))
                .build();
    }
    @PutMapping(value = "/{permission}")
    public APIResponse<PermissionResponse> updatePermission(@PathVariable String permission, @RequestBody PermissionUpdateRequest request) {
        return APIResponse.<PermissionResponse>builder()
                .data(permissionService.updatePermission(permission, request))
                .build();
    }
    @DeleteMapping(value = "/{permission}")
    public APIResponse<PermissionResponse> deletePermission(@PathVariable String permission) {
        permissionService.deletePermission(permission);
        return APIResponse.<PermissionResponse>builder()
                .message("Permission deleted")
                .build();
    }
    @GetMapping(value = "/role/{role}")
    public APIResponse<List<PermissionResponse>> getRolePermissions(@PathVariable String role) {
        return APIResponse.<List<PermissionResponse>>builder()
                .data(permissionService.getPermissionsByRole(role))
                .build();
    }
}
