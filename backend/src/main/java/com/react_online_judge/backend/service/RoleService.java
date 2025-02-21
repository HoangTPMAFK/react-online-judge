package com.react_online_judge.backend.service;

import com.react_online_judge.backend.dto.request.RoleCreationRequest;
import com.react_online_judge.backend.dto.request.RoleUpdateRequest;
import com.react_online_judge.backend.dto.response.RoleResponse;
import com.react_online_judge.backend.entity.Role;
import com.react_online_judge.backend.exception.AppException;
import com.react_online_judge.backend.exception.ErrorCode;
import com.react_online_judge.backend.mapper.RoleMapper;
import com.react_online_judge.backend.repository.PermissionRepository;
import com.react_online_judge.backend.repository.RoleRepository;
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
public class RoleService {
    RoleRepository roleRepository;
    PermissionRepository permissionRepository;
    RoleMapper roleMapper;
    public RoleResponse getRoleByName(String name) {
        Role role = roleRepository.findByName(name).orElseThrow(() -> new AppException(ErrorCode.ROLE_NOT_EXISTED));
        return roleMapper.toRoleResponse(role);
    }
    public List<RoleResponse> getAllRoles() {
        List<Role> roles = roleRepository.findAll();
        return roleMapper.toRoleResponseList(roles);
    }
    public RoleResponse creatRole(RoleCreationRequest request) {
        Role role = roleMapper.toRole(request);
        try {
            roleRepository.save(role);
        } catch (DataIntegrityViolationException e) {
            throw new AppException(ErrorCode.ROLE_EXISTED);
        }
        return roleMapper.toRoleResponse(role);
    }
    public RoleResponse updateRole(String name, RoleUpdateRequest request) {
        Role role = roleRepository.findByName(name).orElseThrow(() -> new AppException(ErrorCode.ROLE_NOT_EXISTED));
        roleMapper.updateRole(role, request);
        try {
            roleRepository.save(role);
        } catch (DataIntegrityViolationException e) {
            throw new AppException(ErrorCode.ROLE_EXISTED);
        }
        return roleMapper.toRoleResponse(role);
    }
}
