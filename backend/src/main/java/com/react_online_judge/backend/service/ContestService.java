package com.react_online_judge.backend.service;

import com.nimbusds.jose.JOSEException;
import com.react_online_judge.backend.dto.request.ContestCreationRequest;
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

    public ContestResponse getContestById(Long id) {
        Contest contest = contestRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.CONTEST_NOT_EXISTED));
        return contestMapper.toContestResponse(contest);
    }
    public ContestResponse getContestByTitle(String title) {
        Contest contest = contestRepository.findByTitle(title).orElseThrow(() -> new AppException(ErrorCode.CONTEST_NOT_EXISTED));
        return contestMapper.toContestResponse(contest);
    }
    public List<ContestResponse> getAllContests() {
        List<Contest> contests = contestRepository.findAll();
        return contestMapper.toContestResponseList(contests);
    }
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
    public List<ContestResponse> getMyCreatedContests(String token, Long userId) {
        List<Contest> contests = contestRepository.findByCreatorId(userId);
        return contestMapper.toContestResponseList(contests);
    }
    public void deleteContest(Long id) {
        contestRepository.deleteById(id);
    }
    public ContestResponse joinContest(Long contestId, String token) {
        try {
            User user = authenticateService.getUserFromToken(token);
            Contest contest = contestRepository.findById(contestId)
                    .orElseThrow(() -> new AppException(ErrorCode.CONTEST_NOT_EXISTED));
            log.info("Participators: {}", contest.getContestParticipators().stream()
                    .map(p -> "User ID: " + p.getUser().getId())
                    .collect(Collectors.joining(", ")));

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
