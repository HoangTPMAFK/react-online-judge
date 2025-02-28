package com.react_online_judge.backend.repository;

import com.react_online_judge.backend.entity.Contest;
import com.react_online_judge.backend.entity.Problem;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ContestRepository extends JpaRepository<Contest, Long> {
    Optional<Contest> findByTitle(String title);
    List<Contest> findByCreatorId(long id);
    void deleteById(Long id);
}
