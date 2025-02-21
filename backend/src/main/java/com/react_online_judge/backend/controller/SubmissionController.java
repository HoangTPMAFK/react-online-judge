package com.react_online_judge.backend.controller;

import com.react_online_judge.backend.dto.request.SubmissionRequest;
import com.react_online_judge.backend.dto.response.APIResponse;
import com.react_online_judge.backend.dto.response.SubmissionResponse;
import com.react_online_judge.backend.service.SubmissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/submission")
public class SubmissionController {
    @Autowired
    private SubmissionService submissionService;

    @PostMapping("/")
    APIResponse<SubmissionResponse> createSubmission(@RequestBody SubmissionRequest request) {
        return APIResponse.<SubmissionResponse>builder()
                .data(submissionService.createSubmission(request))
                .build();
    }
    @GetMapping("/?submission={submissionId}/")
    APIResponse<SubmissionResponse> getSubmissionById(@PathVariable Long id) {
        return APIResponse.<SubmissionResponse>builder()
                .data(submissionService.getSubmissionById(id))
                .build();
    }
    @GetMapping("/?problem={problemId}&user={userId}/")
    APIResponse<SubmissionResponse> getProblemByProblemIdAndUserId(@PathVariable Long problemId, @PathVariable Long userId) {
        return APIResponse.<SubmissionResponse>builder()
                .data(submissionService.getSubmissionByUserIdAndProblemId(userId, problemId))
                .build();
    }
    @GetMapping("/?problem={problemId}")
    APIResponse<List<SubmissionResponse>> getProblemByProblemId(@PathVariable Long problemId) {
        return APIResponse.<List<SubmissionResponse>>builder()
                .data(submissionService.getAllSubmissionsByProblemId(problemId))
                .build();
    }
}
