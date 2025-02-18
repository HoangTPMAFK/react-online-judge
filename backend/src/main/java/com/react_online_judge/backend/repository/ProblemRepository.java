package com.react_online_judge.backend.repository;

import com.react_online_judge.backend.entity.Problem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProblemRepository extends JpaRepository<Problem, Long> {
    Optional<Problem> findByTitle(String title);
}
