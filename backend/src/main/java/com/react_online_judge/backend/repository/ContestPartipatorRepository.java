package com.react_online_judge.backend.repository;

import com.react_online_judge.backend.entity.Contest;
import com.react_online_judge.backend.entity.ContestParticipator;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ContestPartipatorRepository extends JpaRepository<ContestParticipator, Long> {
    Optional<ContestParticipator> findByUserIdAndContestId(Long userId, Long contestId);
    List<ContestParticipator> findByContestId(Long contestId);
}
