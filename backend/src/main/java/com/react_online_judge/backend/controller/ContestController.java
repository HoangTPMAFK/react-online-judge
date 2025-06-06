package com.react_online_judge.backend.controller;

import com.nimbusds.jose.JOSEException;
import com.react_online_judge.backend.dto.request.ContestCreationRequest;
import com.react_online_judge.backend.dto.request.ContestJoinRequest;
import com.react_online_judge.backend.dto.request.ContestUpdateRequest;
import com.react_online_judge.backend.dto.response.APIResponse;
import com.react_online_judge.backend.dto.response.ContestResponse;
import com.react_online_judge.backend.dto.response.ProblemResponse;
import com.react_online_judge.backend.dto.response.UserResponse;
import com.react_online_judge.backend.exception.AppException;
import com.react_online_judge.backend.exception.ErrorCode;
import com.react_online_judge.backend.service.ContestService;
import com.react_online_judge.backend.service.ProblemService;
import com.react_online_judge.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;

@RestController
@RequestMapping("/api/contest")
public class ContestController {
    @Autowired
    ContestService contestService;
    @Autowired
    ProblemService problemService;
    @Autowired
    UserService userService;
    @GetMapping("/")
    public APIResponse<List<ContestResponse>> getAllContests() {
        return APIResponse.<List<ContestResponse>>builder()
                .data(contestService.getAllContests())
                .build();
    }
    @GetMapping("/{contestId}")
    public APIResponse<ContestResponse> getContestById(@PathVariable Long contestId) {
        return APIResponse.<ContestResponse>builder()
                .data(contestService.getContestById(contestId))
                .build();
    }
    @PostMapping("/{contestId}/join")
    public APIResponse<ContestResponse> joinContest(@PathVariable Long contestId, @RequestHeader("Authorization") String token, @RequestBody ContestJoinRequest request) throws ParseException, JOSEException {
        return APIResponse.<ContestResponse>builder()
                .data(contestService.joinContest(contestId, token, request))
                .build();
    }
    @PostMapping("/")
    public APIResponse<ContestResponse> createContest(@RequestHeader("Authorization") String token, @RequestBody ContestCreationRequest request) {
        return APIResponse.<ContestResponse>builder()
                .data(contestService.createContest(token, request))
                .build();
    }
    @PutMapping("/{contestId}")
    public APIResponse<ContestResponse> updateContest(@RequestHeader("Authorization") String token, @PathVariable Long contestId, @RequestBody ContestUpdateRequest request) {
        return APIResponse.<ContestResponse>builder()
                .data(contestService.updateContest(token, contestId, request))
                .build();
    }
    @DeleteMapping("/{contestId}")
    public APIResponse<ContestResponse> deleteContest(@RequestHeader("Authorization") String token, @PathVariable Long contestId) {
        contestService.deleteContest(contestId);
        return APIResponse.<ContestResponse>builder()
                .message("Contest successfully deleted")
                .build();
    }
    @GetMapping("/problem/{contestId}")
    public APIResponse<List<ProblemResponse>> getContestProblem(@PathVariable Long contestId) {
        return APIResponse.<List<ProblemResponse>>builder()
                .data(problemService.getProblemsByContest(contestId))
                .build();
    }
    @GetMapping("/user/{contestId}")
    public APIResponse<List<UserResponse>> getParticipators(@PathVariable Long contestId) {
        return APIResponse.<List<UserResponse>>builder()
                .data(userService.getParticipators(contestId))
                .build();
    }
    @GetMapping("/my-created-contests")
    public APIResponse<List<ContestResponse>> getMyCreatedContests(@RequestHeader("Authorization") String token) {
        return APIResponse.<List<ContestResponse>>builder()
                .data(contestService.getMyCreatedContests(token))
                .build();
    }
}
