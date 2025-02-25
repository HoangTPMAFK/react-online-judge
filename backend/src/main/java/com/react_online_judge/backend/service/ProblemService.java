package com.react_online_judge.backend.service;

import com.react_online_judge.backend.dto.request.ProblemCreationRequest;
import com.react_online_judge.backend.dto.request.ProblemUpdateRequest;
import com.react_online_judge.backend.dto.response.ProblemResponse;
import com.react_online_judge.backend.entity.Announcement;
import com.react_online_judge.backend.entity.Problem;
import com.react_online_judge.backend.exception.AppException;
import com.react_online_judge.backend.exception.ErrorCode;
import com.react_online_judge.backend.mapper.ProblemMapper;
import com.react_online_judge.backend.repository.AnnouncementRepository;
import com.react_online_judge.backend.repository.ProblemRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProblemService {
    ProblemRepository problemRepository;
    ProblemMapper problemMapper;
    AnnouncementRepository announcementRepository;
    public ProblemResponse getProblemById(Long id) {
        Problem problem = problemRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.PROBLEM_NOT_EXISTED));
        return problemMapper.toProblemResponse(problem);
    }
    public ProblemResponse getProblemByName(String title) {
        Problem problem = problemRepository.findByTitle(title).orElseThrow(() -> new AppException(ErrorCode.PROBLEM_NOT_EXISTED));
        return problemMapper.toProblemResponse(problem);
    }
    public List<ProblemResponse> getAllProblems() {
        List<Problem> problems = problemRepository.findAll();
        return problemMapper.toProblemResponseList(problems);
    }
    public List<ProblemResponse> getProblemsByContest(Long contestId) {
        List<Problem> problems = problemRepository.findByContestId(contestId);
        return problemMapper.toProblemResponseList(problems);
    }
    public List<ProblemResponse> getAllPublicProblems() {
        List<Problem> problems = problemRepository.findAllByPublicFlag(true);
        return problemMapper.toProblemResponseList(problems);
    }
    public ProblemResponse createProblem(ProblemCreationRequest request) {
        Problem problem = problemMapper.toProblem(request);
        try {
            problem = problemRepository.save(problem);
            if (problem.isPublicFlag()) {
                Announcement announcement = Announcement.builder()
                        .title(problem.getTitle())
                        .author(problem.getAuthor())
                        .createAt(LocalDateTime.now())
                        .href("/problem/" + problem.getId())
                        .build();
                announcementRepository.save(announcement);
            }
            return problemMapper.toProblemResponse(problem);
        } catch (DataIntegrityViolationException e) {
            throw new AppException(ErrorCode.PROBLEM_EXISTED);
        }
    }
    public ProblemResponse updateProblem(Long id, ProblemUpdateRequest request) {
        Problem problem = problemRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.PROBLEM_NOT_EXISTED));
        problemMapper.updateProblem(problem, request);
        try {
            problemRepository.save(problem);
            return problemMapper.toProblemResponse(problem);
        } catch (DataIntegrityViolationException e) {
            throw new AppException(ErrorCode.PROBLEM_EXISTED);
        }
    }
    public void deleteProblem(Long id) {
        problemRepository.deleteById(id);
    }
}
