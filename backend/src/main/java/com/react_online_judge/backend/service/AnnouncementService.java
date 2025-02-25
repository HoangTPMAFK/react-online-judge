package com.react_online_judge.backend.service;

import com.react_online_judge.backend.dto.request.AnnouncementRequest;
import com.react_online_judge.backend.dto.response.AnnouncementResponse;
import com.react_online_judge.backend.entity.Announcement;
import com.react_online_judge.backend.mapper.AnnouncementMapper;
import com.react_online_judge.backend.repository.AnnouncementRepository;
import com.react_online_judge.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class AnnouncementService {
    private final AnnouncementRepository announcementRepository;
    private final AnnouncementMapper announcementMapper;
    public AnnouncementResponse createAnnouncement(AnnouncementRequest announcementRequest) {
        Announcement announcement = announcementMapper.toAnnouncement(announcementRequest);
        announcementRepository.save(announcement);
        return announcementMapper.toAnnouncementResponse(announcement);
    }
    public List<AnnouncementResponse> getAllAnnouncements() {
        List<Announcement> announcements = announcementRepository.findAll();
        return announcementMapper.toAnnouncementResponses(announcements);
    }
}
