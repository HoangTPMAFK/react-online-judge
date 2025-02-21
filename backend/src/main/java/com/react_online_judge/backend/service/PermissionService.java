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
    PermissionResponse getPermissionResponse(String name) {
        Permission permission = permissionRepository.findByName(name).orElseThrow(() -> new AppException(ErrorCode.PERMISSION_NOT_EXISTED));
        return permissionMapper.toPermissionResponse(permission);
    }
    List<PermissionResponse> getPermissionResponses() {
        List<Permission> permissions = permissionRepository.findAll();
        return permissionMapper.toPermissionResponseList(permissions);
    }
    PermissionResponse createPermission(PermissionCreationRequest request) {
        Permission permission = permissionMapper.toPermission(request);
        try {
            permissionRepository.save(permission);
            return permissionMapper.toPermissionResponse(permission);
        } catch (DataIntegrityViolationException e) {
            throw new AppException(ErrorCode.PERMISSION_EXISTED);
        }
    }
    PermissionResponse updatePermission(String name, PermissionUpdateRequest request) {
        Permission permission = permissionRepository.findByName(name).orElseThrow(() -> new AppException(ErrorCode.PERMISSION_NOT_EXISTED));
        permissionMapper.updatePermission(permission, request);
        try {
            permissionRepository.save(permission);
            return permissionMapper.toPermissionResponse(permission);
        } catch (DataIntegrityViolationException e) {
            throw new AppException(ErrorCode.PERMISSION_EXISTED);
        }
    }
    void deletePermission(String name) {
        permissionRepository.deleteByName(name);
    }
}
