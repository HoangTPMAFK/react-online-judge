package com.react_online_judge.backend.repository;

import com.react_online_judge.backend.entity.Submission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface SubmissionRepository extends JpaRepository<Submission, Long> {
    @Query("SELECT s FROM Submission s JOIN s.user u WHERE u.id = :userId")
    List<Submission> findByUserId(@Param("userId") Long userId);
    @Query("SELECT s FROM Submission s WHERE s.user.id = :userId AND s.problem.id = :problemId")
    Optional<Submission> findByUserIdAndProblemId(@Param("userId") Long userId, @Param("problemId") Long problemId);
    @Query("SELECT s FROM Submission s JOIN s.problem p WHERE p.id = :problemId")
    List<Submission> findByProblemId(@Param("problemId") Long problemId);
}
