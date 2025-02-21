package com.react_online_judge.backend.repository;

import com.react_online_judge.backend.entity.Permission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PermissionRepository extends JpaRepository<Permission, Long> {
    Optional<Permission> findByName(String name);
    @Query("SELECT p FROM Permission p JOIN p.holdingRoles r WHERE r.name = :role")
    List<Permission> findByRole(@Param("role") String role);
    void deleteByName(String name);
}
