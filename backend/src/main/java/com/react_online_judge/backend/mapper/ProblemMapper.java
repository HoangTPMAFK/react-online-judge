package com.react_online_judge.backend.mapper;

import com.react_online_judge.backend.dto.request.ProblemCreationRequest;
import com.react_online_judge.backend.dto.request.ProblemUpdateRequest;
import com.react_online_judge.backend.dto.response.ProblemResponse;
import com.react_online_judge.backend.entity.Problem;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProblemMapper {
    Problem toProblem(ProblemCreationRequest request);
    ProblemResponse toProblemResponse(Problem problem);
    List<ProblemResponse> toProblemResponseList(List<Problem> problems);
    void updateProblem(@MappingTarget Problem problem, ProblemUpdateRequest request);
}
