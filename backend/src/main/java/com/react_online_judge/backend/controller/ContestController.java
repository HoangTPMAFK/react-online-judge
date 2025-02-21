package com.react_online_judge.backend.controller;

import com.react_online_judge.backend.dto.request.ContestCreationRequest;
import com.react_online_judge.backend.dto.request.ContestUpdateRequest;
import com.react_online_judge.backend.dto.response.APIResponse;
import com.react_online_judge.backend.dto.response.ContestResponse;
import com.react_online_judge.backend.dto.response.ProblemResponse;
import com.react_online_judge.backend.dto.response.UserResponse;
import com.react_online_judge.backend.service.ContestService;
import com.react_online_judge.backend.service.ProblemService;
import com.react_online_judge.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contest/")
public class ContestController {
    @Autowired
    ContestService contestService;
    @Autowired
    ProblemService problemService;
    @Autowired
    UserService userService;
    @GetMapping("/?contest={contestId}/")
    APIResponse<ContestResponse> getContestById(@PathVariable Long contestId) {
        return APIResponse.<ContestResponse>builder()
                .data(contestService.getContestById(contestId))
                .build();
    }
    @PostMapping("/")
    APIResponse<ContestResponse> createContest(@RequestBody ContestCreationRequest request) {
        return APIResponse.<ContestResponse>builder()
                .data(contestService.createContest(request))
                .build();
    }
    @PutMapping("/?contest={contestId}/")
    APIResponse<ContestResponse> updateContest(@PathVariable Long contestId, @RequestBody ContestUpdateRequest request) {
        return APIResponse.<ContestResponse>builder()
                .data(contestService.updateContest(contestId, request))
                .build();
    }
    @DeleteMapping("/?contest={contestId}/")
    APIResponse<ContestResponse> deleteContest(@PathVariable Long contestId) {
        return APIResponse.<ContestResponse>builder()
                .message("Contest successfully deleted")
                .build();
    }
    @GetMapping("/")
    APIResponse<List<ContestResponse>> getAllContests() {
        return APIResponse.<List<ContestResponse>>builder()
                .data(contestService.getAllContests())
                .build();
    }
    @GetMapping("/problem/?contest={contestId}")
    APIResponse<List<ProblemResponse>> getContestProblem(@PathVariable Long contestId) {
        return APIResponse.<List<ProblemResponse>>builder()
                .data(problemService.getProblemsByContest(contestId))
                .build();
    }
    @GetMapping("/user/?contest={contestId}")
    APIResponse<List<UserResponse>> getContestUser(@PathVariable Long contestId) {
        return APIResponse.<List<UserResponse>>builder()
                .data(userService.getParticipators(contestId))
                .build();
    }
}
