package com.react_online_judge.backend.service;

import com.nimbusds.jose.JOSEException;
import com.react_online_judge.backend.configuration.SecurityConfig;
import com.react_online_judge.backend.dto.request.ContestCreationRequest;
import com.react_online_judge.backend.dto.request.ContestJoinRequest;
import com.react_online_judge.backend.dto.request.ContestUpdateRequest;
import com.react_online_judge.backend.dto.response.ContestResponse;
import com.react_online_judge.backend.entity.Announcement;
import com.react_online_judge.backend.entity.Contest;
import com.react_online_judge.backend.entity.ContestParticipator;
import com.react_online_judge.backend.entity.User;
import com.react_online_judge.backend.exception.AppException;
import com.react_online_judge.backend.exception.ErrorCode;
import com.react_online_judge.backend.mapper.ContestMapper;
import com.react_online_judge.backend.repository.AnnouncementRepository;
import com.react_online_judge.backend.repository.ContestPartipatorRepository;
import com.react_online_judge.backend.repository.ContestRepository;
import com.react_online_judge.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ContestService {
    @Autowired
    ContestRepository contestRepository;
    @Autowired
    ContestMapper contestMapper;
    @Autowired
    AnnouncementRepository announcementRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    AuthenticateService authenticateService;
    @Autowired
    private ContestPartipatorRepository contestPartipatorRepository;
    @PreAuthorize("permitAll()")
    public ContestResponse getContestById(Long id) {
        Contest contest = contestRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.CONTEST_NOT_EXISTED));
        return contestMapper.toContestResponse(contest);
    }
    @PreAuthorize("permitAll()")
    public ContestResponse getContestByTitle(String title) {
        Contest contest = contestRepository.findByTitle(title).orElseThrow(() -> new AppException(ErrorCode.CONTEST_NOT_EXISTED));
        return contestMapper.toContestResponse(contest);
    }
    @PreAuthorize("permitAll()")
    public List<ContestResponse> getAllContests() {
        List<Contest> contests = contestRepository.findAll();
        return contestMapper.toContestResponseList(contests);
    }
    @PreAuthorize("hasRole('ADMIN') and hasAuthority('CREATE_CONTEST')")
    public ContestResponse createContest(String token, ContestCreationRequest request) {
        Contest contest = contestMapper.toContest(request);
        User user;
        try {
            user = authenticateService.getUserFromToken(token);
            contest.setCreatorId(user.getId());
        } catch (ParseException | JOSEException e) {
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }
        try {
            contest = contestRepository.save(contest);
            Announcement announcement = Announcement.builder()
                    .title(contest.getTitle())
                    .createAt(LocalDateTime.now())
                    .href("/contest/" + contest.getId())
                    .build();
            announcementRepository.save(announcement);
            return contestMapper.toContestResponse(contest);
        } catch (DataIntegrityViolationException e) {
            throw new AppException(ErrorCode.CONTEST_EXISTED);
        }
    }
    @PreAuthorize("hasRole('ADMIN') and hasAuthority('UPDATE_CONTEST')")
    public ContestResponse updateContest(String token, Long id, ContestUpdateRequest request) {
        Contest contest = contestRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.CONTEST_NOT_EXISTED));
        User user;
        try {
            user = authenticateService.getUserFromToken(token);
            if (contest.getCreatorId() != user.getId()) {
                throw new AppException(ErrorCode.UNAUTHENTICATED);
            }
        } catch (ParseException | JOSEException e) {
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }
        contestMapper.updateContest(contest, request);
        try {
            contest = contestRepository.save(contest);
            return contestMapper.toContestResponse(contest);
        } catch (DataIntegrityViolationException e) {
            throw new AppException(ErrorCode.CONTEST_EXISTED);
        }
    }
    @PreAuthorize("hasRole('ADMIN')")
    public List<ContestResponse> getMyCreatedContests(String token) {
        User user;
        try {
            user = authenticateService.getUserFromToken(token);
            List<Contest> contests = contestRepository.findByCreatorId(user.getId());
            return contestMapper.toContestResponseList(contests);
        } catch (ParseException | JOSEException e) {
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }

    }
    @PreAuthorize("hasRole('ADMIN') and hasAuthority('DELETE_CONTEST')")
    public void deleteContest(Long id) {
        Contest contest = contestRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.CONTEST_NOT_EXISTED));
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        try {
            User user = authenticateService.getUserFromToken(username);
            if (contest.getCreatorId() != user.getId()) {
                throw new AppException(ErrorCode.UNAUTHORIZED);
            }
            contestRepository.deleteById(id);
        } catch (ParseException | JOSEException e) {
            throw new RuntimeException(e);
        }
    }
    @PreAuthorize("hasRole('USER')")
    public ContestResponse joinContest(Long contestId, String token, ContestJoinRequest request) {
        try {
            User user = authenticateService.getUserFromToken(token);
            Contest contest = contestRepository.findById(contestId)
                    .orElseThrow(() -> new AppException(ErrorCode.CONTEST_NOT_EXISTED));
            log.info("Participators: {}", contest.getContestParticipators().stream()
                    .map(p -> "User ID: " + p.getUser().getId())
                    .collect(Collectors.joining(", ")));
            if (!contest.getPassword().equals(request.getPassword())) {
                throw new AppException(ErrorCode.INVALID_PASSWORD);
            }
            if (contest.getContestParticipators().stream()
                    .anyMatch(p -> p.getUser().getId() == (user.getId()))) {
                throw new AppException(ErrorCode.ALREADY_JOINED);
            }
            ContestParticipator contestParticipator = ContestParticipator.builder()
                    .contest(contest)
                    .user(user)
                    .build();
            contest.getContestParticipators().add(contestParticipator);

            ContestParticipator cp = contestPartipatorRepository.save(contestParticipator);
            log.info(cp.toString());
            contestRepository.save(contest);
            return contestMapper.toContestResponse(contest);
        } catch (ParseException | JOSEException e) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }
    }
}
