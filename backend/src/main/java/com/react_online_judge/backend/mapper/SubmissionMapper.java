package com.react_online_judge.backend.mapper;

import com.react_online_judge.backend.dto.request.SubmissionRequest;
import com.react_online_judge.backend.dto.response.SubmissionResponse;
import com.react_online_judge.backend.entity.Submission;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface SubmissionMapper {
    Submission toSubmission(SubmissionRequest request);
    SubmissionResponse toSubmissionResponse(Submission submission);
    List<SubmissionResponse> toSubmissionResponseList(List<Submission> submissions);
}
