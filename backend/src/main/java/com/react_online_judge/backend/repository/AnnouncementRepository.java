package com.react_online_judge.backend.repository;

import com.react_online_judge.backend.entity.Announcement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {

}
