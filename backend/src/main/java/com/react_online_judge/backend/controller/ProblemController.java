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
@RequestMapping("/api/problem/")
public class ProblemController {
    @Autowired
    private ProblemService problemService;
    @GetMapping("/?problem={problemId}")
    APIResponse<ProblemResponse> getProblemByid(@PathVariable Long problemId) {
        return APIResponse.<ProblemResponse>builder()
                .data(problemService.getProblemById(problemId))
                .build();
    }
    @GetMapping("/")
    APIResponse<List<ProblemResponse>> getAllProblems() {
        return APIResponse.<List<ProblemResponse>>builder()
                .data(problemService.getAllProblems())
                .build();
    }
    @PostMapping("/")
    APIResponse<ProblemResponse> createProblem(@RequestBody ProblemCreationRequest request) {
        return APIResponse.<ProblemResponse>builder()
                .data(problemService.createProblem(request))
                .build();
    }
    @PutMapping("/?problem={problemId}")
    APIResponse<ProblemResponse> updateProblem(@PathVariable Long problemId, @RequestBody ProblemUpdateRequest request) {
        return APIResponse.<ProblemResponse>builder()
                .data(problemService.updateProblem(problemId, request))
                .build();
    }
    @DeleteMapping("/?problem={problemId}")
    APIResponse<ProblemResponse> deleteProblem(@PathVariable Long problemId) {
        problemService.deleteProblem(problemId);
        return APIResponse.<ProblemResponse>builder()
                .message("Problem deleted")
                .build();
    }
}
