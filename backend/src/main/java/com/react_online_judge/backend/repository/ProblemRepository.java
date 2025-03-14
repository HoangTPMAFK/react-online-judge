package com.react_online_judge.backend.repository;

import com.react_online_judge.backend.entity.Problem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProblemRepository extends JpaRepository<Problem, Long> {
    Optional<Problem> findByTitle(String title);
    @Query("SELECT p FROM Problem p JOIN p.contests c WHERE c.id = :contestId")
    List<Problem> findByContestId(@Param("contestId") Long contestId);
    List<Problem> findAllByPublicFlag(boolean isPublic);
    List<Problem> findAllByAuthor(String author);
    @Query("SELECT p FROM Problem p WHERE p.author = :author AND p.title LIKE %:title%")
    List<Problem> findAllByAuthorAndTitleLike(@Param("author") String author, @Param("title") String title);
    void deleteById(Long id);
}
