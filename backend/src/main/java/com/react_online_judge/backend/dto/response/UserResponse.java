package com.react_online_judge.backend.dto.response;

import com.react_online_judge.backend.dto.common.SolvedProblemDTO;
import com.react_online_judge.backend.dto.common.SubmissionDTO;
import com.react_online_judge.backend.entity.Role;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserResponse {
    long id;
    String fname;
    String lname;
    String username;
    String email;
    Set<String> roles;
    Set<SolvedProblemDTO> solvedProblems;
    Set<SubmissionDTO> submissions;
    String avatar;
    int point;
    Date dob;
    LocalDateTime createAt;
    String gender;
}
