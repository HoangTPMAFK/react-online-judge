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
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PermissionService {
    PermissionRepository permissionRepository;
    PermissionMapper permissionMapper;
    public PermissionResponse getPermissionResponse(String name) {
        Permission permission = permissionRepository.findByName(name).orElseThrow(() -> new AppException(ErrorCode.PERMISSION_NOT_EXISTED));
        return permissionMapper.toPermissionResponse(permission);
    }
    public List<PermissionResponse> getAllPermissions() {
        List<Permission> permissions = permissionRepository.findAll();
        return permissionMapper.toPermissionResponseList(permissions);
    }
    public PermissionResponse createPermission(PermissionCreationRequest request) {
        Permission permission = permissionMapper.toPermission(request);
        log.info("Create permission request: {}", request.toString());
        log.info("Create permission: {}", permission.toString());
        try {
            permissionRepository.save(permission);
            return permissionMapper.toPermissionResponse(permission);
        } catch (DataIntegrityViolationException e) {
            throw new AppException(ErrorCode.PERMISSION_EXISTED);
        }
    }
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
    public void deletePermission(String name) {
        permissionRepository.deleteByName(name);
    }
    public  List<PermissionResponse> getPermissionsByRole(String role) {
        List<Permission> permission = permissionRepository.findByRole(role);
        return permissionMapper.toPermissionResponseList(permission);
    }
}
