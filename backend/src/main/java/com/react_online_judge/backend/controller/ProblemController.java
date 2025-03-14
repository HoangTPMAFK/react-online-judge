package com.react_online_judge.backend.controller;

import com.react_online_judge.backend.dto.request.ProblemCreationRequest;
import com.react_online_judge.backend.dto.request.ProblemUpdateRequest;
import com.react_online_judge.backend.dto.response.APIResponse;
import com.react_online_judge.backend.dto.response.ProblemResponse;
import com.react_online_judge.backend.service.ProblemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/problem")
public class ProblemController {
    @Autowired
    private ProblemService problemService;
    @GetMapping("/{problemId}")
    public APIResponse<ProblemResponse> getProblemByid(@RequestHeader("Authorization") String token, @PathVariable Long problemId) {
        return APIResponse.<ProblemResponse>builder()
                .data(problemService.getProblemById(token, problemId))
                .build();
    }
    @GetMapping("/")
    public APIResponse<List<ProblemResponse>> getAllProblems() {
        return APIResponse.<List<ProblemResponse>>builder()
                .data(problemService.getAllProblems())
                .build();
    }
    @GetMapping("/my-created-problems")
    public APIResponse<List<ProblemResponse>> getMyCreatedProblems(@RequestHeader("Authorization") String token) {
        return APIResponse.<List<ProblemResponse>>builder()
                .data(problemService.getProblemsByCreator(token))
                .build();
    }
    @GetMapping("/my-created-problems/{name}")
    public APIResponse<List<ProblemResponse>> getMyCreatedProblems(@RequestHeader("Authorization") String token, @PathVariable String name) {
        return APIResponse.<List<ProblemResponse>>builder()
                .data(problemService.getProblemsByCreatorAndByTitle(token, name))
                .build();
    }
    @GetMapping("/public")
    public APIResponse<List<ProblemResponse>> getAllPublicProblems() {
        return APIResponse.<List<ProblemResponse>>builder()
                .data(problemService.getAllPublicProblems())
                .build();
    }
    @PostMapping("/")
    public APIResponse<ProblemResponse> createProblem(@RequestHeader("Authorization") String token, @RequestBody ProblemCreationRequest request) {
        return APIResponse.<ProblemResponse>builder()
                .data(problemService.createProblem(token, request))
                .build();
    }
    @PutMapping("/{problemId}")
    public APIResponse<ProblemResponse> updateProblem(@RequestHeader("Authorization") String token, @PathVariable Long problemId, @RequestBody ProblemUpdateRequest request) {
        return APIResponse.<ProblemResponse>builder()
                .data(problemService.updateProblem(token, problemId, request))
                .build();
    }
    @DeleteMapping("/{problemId}")
    public APIResponse<ProblemResponse> deleteProblem(@RequestHeader("Authorization") String token, @PathVariable Long problemId) {
        problemService.deleteProblem(token, problemId);
        return APIResponse.<ProblemResponse>builder()
                .message("Problem deleted")
                .build();
    }
}
