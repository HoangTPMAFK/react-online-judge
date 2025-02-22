package com.react_online_judge.backend.mapper;

import com.react_online_judge.backend.dto.request.ProblemCreationRequest;
import com.react_online_judge.backend.dto.request.ProblemUpdateRequest;
import com.react_online_judge.backend.dto.response.ProblemResponse;
import com.react_online_judge.backend.entity.Problem;
import com.react_online_judge.backend.repository.ProblemRepository;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProblemMapper {
    Problem toProblem(ProblemCreationRequest request);
    ProblemResponse toProblemResponse(Problem problem);
    List<ProblemResponse> toProblemResponseList(List<Problem> problems);
    void updateProblem(@MappingTarget Problem problem, ProblemUpdateRequest request);
}