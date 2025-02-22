package com.react_online_judge.backend.repository;

import com.react_online_judge.backend.entity.Role;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    @EntityGraph(attributePaths = {"rolePermissions"})
    Optional<Role> findRoleByName(@Param("name") String name);
    void deleteByName(String name);
}
