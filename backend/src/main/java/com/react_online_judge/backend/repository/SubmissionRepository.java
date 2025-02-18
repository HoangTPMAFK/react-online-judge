package com.react_online_judge.backend.repository;

import com.react_online_judge.backend.entity.Submission;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubmissionRepository extends JpaRepository<Submission, Long> {
}
