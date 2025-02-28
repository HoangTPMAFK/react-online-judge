package com.react_online_judge.backend.service;

import com.react_online_judge.backend.dto.request.PermissionCreationRequest;
import com.react_online_judge.backend.dto.request.PermissionUpdateRequest;
import com.react_online_judge.backend.dto.response.PermissionResponse;
import com.react_online_judge.backend.entity.Permission;
import com.react_online_judge.backend.exception.AppException;
import com.react_online_judge.backend.exception.ErrorCode;
import com.react_online_judge.backend.mapper.PermissionMapper;
import com.react_online_judge.backend.repository.PermissionRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PermissionService {
    PermissionRepository permissionRepository;
    PermissionMapper permissionMapper;
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public List<PermissionResponse> getAllPermissions() {
        List<Permission> permissions = permissionRepository.findAll();
        return permissionMapper.toPermissionResponseList(permissions);
    }
    @PreAuthorize("hasRole('SUPER_ADMIN') and hasAuthority('CREATE_PERMISSION')")
    public PermissionResponse createPermission(PermissionCreationRequest request) {
        Permission permission = permissionMapper.toPermission(request);
        try {
            permissionRepository.save(permission);
            return permissionMapper.toPermissionResponse(permission);
        } catch (DataIntegrityViolationException e) {
            throw new AppException(ErrorCode.PERMISSION_EXISTED);
        }
    }
    @PreAuthorize("hasRole('SUPER_ADMIN') and hasAuthority('UPDATE_PERMISSION')")
    public PermissionResponse updatePermission(String name, PermissionUpdateRequest request) {
        Permission permission = permissionRepository.findByName(name).orElseThrow(() -> new AppException(ErrorCode.PERMISSION_NOT_EXISTED));
        permissionMapper.updatePermission(permission, request);
        try {
            permissionRepository.save(permission);
            return permissionMapper.toPermissionResponse(permission);
        } catch (DataIntegrityViolationException e) {
            throw new AppException(ErrorCode.PERMISSION_EXISTED);
        }
    }
    @PreAuthorize("hasRole('SUPER_ADMIN') and hasAuthority('DELETE_PERMISSION')")
    public void deletePermission(String name) {
        permissionRepository.deleteByName(name);
    }
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public  List<PermissionResponse> getPermissionsByRole(String role) {
        List<Permission> permission = permissionRepository.findByRole(role);
        return permissionMapper.toPermissionResponseList(permission);
    }
}
