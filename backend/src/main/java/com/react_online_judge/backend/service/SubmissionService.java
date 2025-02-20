package com.react_online_judge.backend.service;

import com.react_online_judge.backend.dto.request.SubmissionRequest;
import com.react_online_judge.backend.dto.response.SubmissionResponse;
import com.react_online_judge.backend.entity.Submission;
import com.react_online_judge.backend.exception.AppException;
import com.react_online_judge.backend.exception.ErrorCode;
import com.react_online_judge.backend.mapper.SubmissionMapper;
import com.react_online_judge.backend.repository.SubmissionRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SubmissionService {
    SubmissionRepository submissionRepository;
    SubmissionMapper submissionMapper;
    SubmissionResponse getSubmissionById(Long id) {
        Submission submission = submissionRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.SUBMISSION_NOT_EXISTED));
        return submissionMapper.toSubmissionResponse(submission);
    }
    SubmissionResponse getSubmissionByUserIdAndProblemId(Long userId, Long problemId) {
        Submission submission = submissionRepository.findByUserIdAndProblemId(problemId, userId).orElseThrow(() -> new AppException(ErrorCode.SUBMISSION_NOT_EXISTED));
        return submissionMapper.toSubmissionResponse(submission);
    }
    List<SubmissionResponse> getAllSubmissionsByProblemId(Long problemId) {
        List<Submission> submission = submissionRepository.findByProblemId(problemId);
        return submissionMapper.toSubmissionResponseList(submission);
    }
    SubmissionResponse createSubmission(SubmissionRequest request) {
        Submission submission = submissionMapper.toSubmission(request);
        return submissionMapper.toSubmissionResponse(submissionRepository.save(submission));
    }
}
