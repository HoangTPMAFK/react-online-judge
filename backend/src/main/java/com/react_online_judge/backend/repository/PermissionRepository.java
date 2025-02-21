package com.react_online_judge.backend.repository;

import com.react_online_judge.backend.entity.Permission;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PermissionRepository extends JpaRepository<Permission, Long> {
    Optional<Permission> findByName(String name);
    void deleteByName(String name);
}
