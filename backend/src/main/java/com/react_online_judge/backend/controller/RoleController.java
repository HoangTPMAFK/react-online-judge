package com.react_online_judge.backend.controller;

import com.react_online_judge.backend.dto.request.RoleCreationRequest;
import com.react_online_judge.backend.dto.request.RoleUpdateRequest;
import com.react_online_judge.backend.dto.response.APIResponse;
import com.react_online_judge.backend.dto.response.RoleResponse;
import com.react_online_judge.backend.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/role")
public class RoleController {
    @Autowired
    private RoleService roleService;
    @GetMapping("/{role}")
    public APIResponse<RoleResponse> getRoleByName(@PathVariable String role) {
        return APIResponse.<RoleResponse>builder()
                .data(roleService.getRoleByName(role))
                .build();
    }
    @GetMapping("/")
    public APIResponse<List<RoleResponse>> createRole() {
        return APIResponse.<List<RoleResponse>>builder()
                .data(roleService.getAllRoles())
                .build();
    }
    @PostMapping("/")
    public APIResponse<RoleResponse> createRole(@RequestBody RoleCreationRequest request) {
        return APIResponse.<RoleResponse>builder()
                .data(roleService.creatRole(request))
                .build();
    }
    @PutMapping("/{role}")
    public APIResponse<RoleResponse> updateRole(@PathVariable String role, @RequestBody RoleUpdateRequest request) {
        return APIResponse.<RoleResponse>builder()
                .data(roleService.updateRole(role, request))
                .build();
    }
    @DeleteMapping("/{role}")
    public APIResponse<RoleResponse> deleteRole(@PathVariable String role) {
        return APIResponse.<RoleResponse>builder()
                .message("Role deleted")
                .build();
    }

}
