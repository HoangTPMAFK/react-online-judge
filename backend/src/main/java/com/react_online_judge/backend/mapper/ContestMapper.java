package com.react_online_judge.backend.mapper;

import com.react_online_judge.backend.dto.common.ContestParticipatorDTO;
import com.react_online_judge.backend.dto.request.ContestCreationRequest;
import com.react_online_judge.backend.dto.request.ContestUpdateRequest;
import com.react_online_judge.backend.dto.response.ContestResponse;
import com.react_online_judge.backend.entity.Contest;
import com.react_online_judge.backend.entity.ContestParticipator;
import com.react_online_judge.backend.entity.Problem;
import com.react_online_judge.backend.entity.User;
import com.react_online_judge.backend.repository.ContestPartipatorRepository;
import com.react_online_judge.backend.repository.ProblemRepository;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", uses = ContestMapperHelper.class)
public interface ContestMapper {
    @Mapping(target = "problems", source = "problems", qualifiedByName = "mapStringsToProblems")
    Contest toContest(ContestCreationRequest request);

    @Mapping(target = "contestParticipators", source = "contestParticipators", qualifiedByName = "mapContestParticipatorToContestParticipatorDTO")
    ContestResponse toContestResponse(Contest contest);

    List<ContestResponse> toContestResponseList(List<Contest> contests);

    @Mapping(target = "problems", source = "problems", qualifiedByName = "mapStringsToProblems")
    void updateContest(@MappingTarget Contest contest, ContestUpdateRequest request);
}

@Component
class ContestMapperHelper {
    @Autowired
    ProblemRepository problemRepository;

    @Autowired
    ContestPartipatorRepository contestPartipatorRepository;

    @Named("mapStringsToProblems")
    public Set<Problem> mapStringsToProblems(Set<String> titles) {
        if (titles == null) {
            return Collections.emptySet();
        } else if (titles.isEmpty()) {
            return Collections.emptySet();
        }
        return titles.stream()
                .map(problemRepository::findByTitle)
                .map(opt -> opt.orElse(null))
                .filter(Objects::nonNull)
                .collect(Collectors.toSet());
    }

    @Named("mapContestParticipatorToContestParticipatorDTO")
    public ContestParticipatorDTO mapContestParticipatorToContestParticipatorDTO(ContestParticipator contestParticipator) {
        if (contestParticipator == null) {
            return null;
        }
        return ContestParticipatorDTO.builder()
                .id(contestParticipator.getId())
                .contestId(contestParticipator.getContest().getId())
                .contestTitle(contestParticipator.getContest().getTitle())
                .userId(contestParticipator.getUser().getId())
                .username(contestParticipator.getUser().getUsername())
                .point(contestParticipator.getPoint())
                .build();
    }
}