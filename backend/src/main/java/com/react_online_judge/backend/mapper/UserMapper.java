package com.react_online_judge.backend.mapper;

import com.react_online_judge.backend.dto.common.SolvedProblemDTO;
import com.react_online_judge.backend.dto.common.SubmissionDTO;
import com.react_online_judge.backend.dto.request.AccountUpdateRequest;
import com.react_online_judge.backend.dto.request.UserCreationRequest;
import com.react_online_judge.backend.dto.request.UserUpdateRequest;
import com.react_online_judge.backend.dto.response.UserResponse;
import com.react_online_judge.backend.entity.Role;
import com.react_online_judge.backend.entity.SolvedProblem;
import com.react_online_judge.backend.entity.Submission;
import com.react_online_judge.backend.entity.User;
import com.react_online_judge.backend.repository.RoleRepository;
import com.react_online_judge.backend.repository.SolvedProblemRepository;
import org.mapstruct.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, uses = {UserMapperHelper.class})
public interface UserMapper {
    @Mapping(target = "roles", source = "roles", qualifiedByName = "mapStringsToRoles")
    User toUser(UserCreationRequest request);

    @Mapping(target = "roles", source = "roles", qualifiedByName = "mapRolesToStrings")
    @Mapping(target = "point", source = "point")
    @Mapping(target = "solvedProblems", source = "solvedProblems", qualifiedByName = "mapSolvedProblemToSolvedProblemDTO")
    @Mapping(target = "submissions", source = "submissions", qualifiedByName = "mapSubmissionToSubmissionDTO")
    @Mapping(target = "fname", source = "fname")
    @Mapping(target = "lname", source = "lname")
    UserResponse toUserResponse(User user);

    List<UserResponse> toUserResponseList(List<User> users);

    @Mapping(target = "roles", source = "roles", qualifiedByName = "mapStringsToRoles")
    void updateUser(@MappingTarget User user, UserUpdateRequest request);

    @Mapping(target = "roles", source = "roles", qualifiedByName = "mapStringsToRoles")
    void updateUser(@MappingTarget User user, AccountUpdateRequest request);
}

@Component
class UserMapperHelper {
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    private SolvedProblemRepository solvedProblemRepository;

    @Named("mapRolesToStrings")
    Set<String> mapRolesToStrings(Set<Role> roles) {
        if (roles == null) return new HashSet<>();
        return roles.stream().map(Role::getName).collect(Collectors.toSet());
    }

    @Named("mapStringsToRoles")
    Set<Role> mapStringsToRoles(Set<String> roleNames) {
        if (roleNames == null) return new HashSet<>();
        return roleNames.stream()
                .map(roleRepository::findRoleByName)
                .filter(Optional::isPresent)
                .map(Optional::get)
                .collect(Collectors.toSet());
    }

    @Named("mapSolvedProblemToSolvedProblemDTO")
    SolvedProblemDTO mapSolvedProblemToSolvedProblemDTO(SolvedProblem solvedProblem) {
        if (solvedProblem == null) return null;
        return SolvedProblemDTO.builder()
                .id(solvedProblem.getId())
                .problemId(solvedProblem.getProblem().getId())
                .problemTitle(solvedProblem.getProblem().getTitle())
                .userId(solvedProblem.getUser().getId())
                .username(solvedProblem.getUser().getUsername())
                .build();
    }

    @Named("mapSubmissionToSubmissionDTO")
    SubmissionDTO mapSubmissionToSubmissionDTO(Submission submission) {
        if (submission == null) return null;
        return SubmissionDTO.builder()
                .id(submission.getId())
                .problemId(submission.getProblem().getId())
                .problemTitle(submission.getProblem().getTitle())
                .userId(submission.getUser().getId())
                .username(submission.getUser().getUsername())
                .language(submission.getLanguage())
                .result(submission.getResult())
                .submitTime(submission.getSubmitTime())
                .sourceCode(submission.getSourceCode())
                .build();
    }
}
