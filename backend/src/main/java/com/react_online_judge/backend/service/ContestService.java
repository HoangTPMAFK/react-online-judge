package com.react_online_judge.backend.service;

import com.react_online_judge.backend.dto.request.ContestCreationRequest;
import com.react_online_judge.backend.dto.request.ContestUpdateRequest;
import com.react_online_judge.backend.dto.response.ContestResponse;
import com.react_online_judge.backend.entity.Announcement;
import com.react_online_judge.backend.entity.Contest;
import com.react_online_judge.backend.exception.AppException;
import com.react_online_judge.backend.exception.ErrorCode;
import com.react_online_judge.backend.mapper.ContestMapper;
import com.react_online_judge.backend.repository.AnnouncementRepository;
import com.react_online_judge.backend.repository.ContestRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

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
    public ContestResponse createContest(ContestCreationRequest request) {
        Contest contest = contestMapper.toContest(request);
        try {
            contest = contestRepository.save(contest);
            Announcement announcement = Announcement.builder()
                    .title(contest.getTitle())
                    .createAt(LocalDateTime.now())
                    .href("/contest/" + contest.getId())
                    .build();
            return contestMapper.toContestResponse(contest);
        } catch (DataIntegrityViolationException e) {
            throw new AppException(ErrorCode.CONTEST_EXISTED);
        }
    }
    public ContestResponse updateContest(Long id, ContestUpdateRequest request) {
        Contest contest = contestRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.CONTEST_NOT_EXISTED));
        contestMapper.updateContest(contest, request);
        try {
            contest = contestRepository.save(contest);
            return contestMapper.toContestResponse(contest);
        } catch (DataIntegrityViolationException e) {
            throw new AppException(ErrorCode.CONTEST_EXISTED);
        }
    }
    public List<ContestResponse> getMyCreatedContests(Long userId) {
        List<Contest> contests = contestRepository.findByCreatorId(userId);
        return contestMapper.toContestResponseList(contests);
    }
    public void deleteContest(Long id) {
        contestRepository.deleteById(id);
    }
}
