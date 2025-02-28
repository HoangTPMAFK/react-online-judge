package com.react_online_judge.backend.repository;

import com.react_online_judge.backend.entity.SolvedProblem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SolvedProblemRepository extends JpaRepository<SolvedProblem, Long> {
    List<SolvedProblem> findAllByUserId(Long userId);
}
