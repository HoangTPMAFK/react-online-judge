package com.react_online_judge.backend.repository;

import com.react_online_judge.backend.entity.InvalidToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface InvalidTokenRepository extends JpaRepository<InvalidToken, String> {
    Optional<InvalidToken> findById(String id);
}
