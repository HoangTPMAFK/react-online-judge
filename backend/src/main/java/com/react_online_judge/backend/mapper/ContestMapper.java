package com.react_online_judge.backend.mapper;

import com.react_online_judge.backend.dto.request.ContestCreationRequest;
import com.react_online_judge.backend.dto.request.ContestUpdateRequest;
import com.react_online_judge.backend.dto.response.ContestResponse;
import com.react_online_judge.backend.entity.Contest;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ContestMapper {
    Contest toContest(ContestCreationRequest request);
    ContestResponse toContestResponse(Contest contest);
    List<ContestResponse> toContestResponseList(List<Contest> contests);
    void updateContest(@MappingTarget Contest contest, ContestUpdateRequest request);
}
