package com.react_online_judge.backend.service;

import com.nimbusds.jose.JOSEException;
import com.react_online_judge.backend.dto.request.ProblemCreationRequest;
import com.react_online_judge.backend.dto.request.ProblemUpdateRequest;
import com.react_online_judge.backend.dto.response.ProblemResponse;
import com.react_online_judge.backend.entity.Announcement;
import com.react_online_judge.backend.entity.Contest;
import com.react_online_judge.backend.entity.Problem;
import com.react_online_judge.backend.entity.User;
import com.react_online_judge.backend.exception.AppException;
import com.react_online_judge.backend.exception.ErrorCode;
import com.react_online_judge.backend.mapper.ProblemMapper;
import com.react_online_judge.backend.repository.AnnouncementRepository;
import com.react_online_judge.backend.repository.ProblemRepository;
import com.react_online_judge.backend.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProblemService {
    ProblemRepository problemRepository;
    ProblemMapper problemMapper;
    AnnouncementRepository announcementRepository;
    UserRepository userRepository;
    AuthenticateService authenticateService;

    @PreAuthorize("permitAll()")
    public ProblemResponse getProblemById(Long id) {
        Problem problem = problemRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.PROBLEM_NOT_EXISTED));
        if (problem.isPublicFlag()) {return problemMapper.toProblemResponse(problem);}
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        if (!auth.isAuthenticated() || "anonymousUser".equals(username)) {
            throw new AppException(ErrorCode.PROBLEM_NOT_EXISTED);
        }
        User user = userRepository.findByUsername(username).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        Set<Contest> contests = new HashSet<>(problem.getContests());
        user.getContestParticipators().forEach(cp -> contests.add(cp.getContest()));
        boolean hasAccess = contests.stream().anyMatch(contest -> problem.getContests().contains(contest));
        if (!hasAccess) {
            throw new AppException(ErrorCode.PROBLEM_NOT_EXISTED);
        }
        return problemMapper.toProblemResponse(problem);
    }
    public ProblemResponse getProblemByName(String title) {
        Problem problem = problemRepository.findByTitle(title).orElseThrow(() -> new AppException(ErrorCode.PROBLEM_NOT_EXISTED));
        return problemMapper.toProblemResponse(problem);
    }
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public List<ProblemResponse> getAllProblems() {
        List<Problem> problems = problemRepository.findAll();
        return problemMapper.toProblemResponseList(problems);
    }
    @PreAuthorize("permitAll()")
    public List<ProblemResponse> getProblemsByContest(Long contestId) {
        List<Problem> problems = problemRepository.findByContestId(contestId);
        return problemMapper.toProblemResponseList(problems);
    }
    @PreAuthorize("hasRole('ADMIN')")
    public List<ProblemResponse> getProblemsByCreator(String token) {
        try {
            User user = authenticateService.getUserFromToken(token);
            List<Problem> problems = problemRepository.findAllByAuthor(user.getUsername());
            return problemMapper.toProblemResponseList(problems);
        } catch (ParseException | JOSEException e) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }
    }
    @PreAuthorize("permitAll()")
    public List<ProblemResponse> getAllPublicProblems() {
        List<Problem> problems = problemRepository.findAllByPublicFlag(true);
        return problemMapper.toProblemResponseList(problems);
    }
    @PreAuthorize("hasAuthority('CREATE_PROBLEM')")
    public ProblemResponse createProblem(String token, ProblemCreationRequest request) {
        Problem problem = problemMapper.toProblem(request);
        User user;
        try {
            user = authenticateService.getUserFromToken(token);
            problem.setAuthor(user.getUsername());
        } catch (ParseException | JOSEException e) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }
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
    @PreAuthorize("hasRole('ADMIN') and hasAuthority('UPDATE_PROBLEM')")
    public ProblemResponse updateProblem(String token, Long id, ProblemUpdateRequest request) {
        Problem problem = problemRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.PROBLEM_NOT_EXISTED));
        problemMapper.updateProblem(problem, request);
        User user;
        try {
            user = authenticateService.getUserFromToken(token);
            if (!problem.getAuthor().equals(user.getUsername())) {
                throw new AppException(ErrorCode.UNAUTHORIZED);
            }
        } catch (ParseException | JOSEException e) {
            throw new RuntimeException(e);
        }
        try {
            problemRepository.save(problem);
            return problemMapper.toProblemResponse(problem);
        } catch (DataIntegrityViolationException e) {
            throw new AppException(ErrorCode.PROBLEM_EXISTED);
        }
    }
    @PreAuthorize("hasRole('ADMIN') and hasAuthority('DELETE_PROBLEM')")
    public void deleteProblem(String token, Long id) {
        User user;
        try {
            user = authenticateService.getUserFromToken(token);
        } catch (ParseException | JOSEException e) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }
        Problem problem = problemRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.PROBLEM_NOT_EXISTED));
        if (!problem.getAuthor().equals(user.getUsername())) {
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }
        problemRepository.deleteById(id);
    }
}
