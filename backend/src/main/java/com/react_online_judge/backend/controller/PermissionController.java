package com.react_online_judge.backend.controller;

import com.react_online_judge.backend.dto.request.PermissionCreationRequest;
import com.react_online_judge.backend.dto.request.PermissionUpdateRequest;
import com.react_online_judge.backend.dto.response.APIResponse;
import com.react_online_judge.backend.dto.response.PermissionResponse;
import com.react_online_judge.backend.service.PermissionService;
import com.react_online_judge.backend.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/permission/")
public class PermissionController {
    @Autowired
    private RoleService roleService;
    @Autowired
    private PermissionService permissionService;
    @GetMapping("/")
    APIResponse<List<PermissionResponse>> getAllPermissions() {
        return APIResponse.<List<PermissionResponse>>builder()
                .data(permissionService.getAllPermissions())
                .build();
    }
    @PostMapping("/")
    APIResponse<PermissionResponse> createPermission(@RequestBody PermissionCreationRequest request) {
        return APIResponse.<PermissionResponse>builder()
                .data(permissionService.createPermission(request))
                .build();
    }
    @PutMapping("/{permission}/")
    APIResponse<PermissionResponse> updatePermission(@PathVariable String permission, @RequestBody PermissionUpdateRequest request) {
        return APIResponse.<PermissionResponse>builder()
                .data(permissionService.updatePermission(permission, request))
                .build();
    }
    @DeleteMapping("/{permission}/")
    APIResponse<PermissionResponse> deletePermission(@PathVariable String permission) {
        permissionService.deletePermission(permission);
        return APIResponse.<PermissionResponse>builder()
                .message("Permission deleted")
                .build();
    }
    @GetMapping("/role/{role}")
    APIResponse<List<PermissionResponse>> getRolePermissions(@PathVariable String role) {
        return APIResponse.<List<PermissionResponse>>builder()
                .data(permissionService.getPermissionsByRole(role))
                .build();
    }
}
