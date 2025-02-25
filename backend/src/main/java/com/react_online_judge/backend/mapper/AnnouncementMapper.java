package com.react_online_judge.backend.mapper;

import com.react_online_judge.backend.dto.request.AnnouncementRequest;
import com.react_online_judge.backend.dto.response.AnnouncementResponse;
import com.react_online_judge.backend.entity.Announcement;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AnnouncementMapper {
    Announcement toAnnouncement(AnnouncementRequest request);
    AnnouncementResponse toAnnouncementResponse(Announcement announcement);
    List<AnnouncementResponse> toAnnouncementResponses(List<Announcement> announcements);

}
