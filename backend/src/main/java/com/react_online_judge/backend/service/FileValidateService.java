package com.react_online_judge.backend.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.tika.Tika;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class FileValidateService {
    static Tika tika = new Tika();
    private static final List<String> ALLOWED_MIME_TYPES = List.of("image/png", "image/jpeg", "image/jpg", "application/pdf");
    public static boolean isValidMimeType(MultipartFile file) {
        try {
            String mimeType = tika.detect(file.getInputStream()); // Detects MIME type from content
            return ALLOWED_MIME_TYPES.contains(mimeType);
        } catch (IOException e) {
            throw new RuntimeException("Failed to detect file type", e);
        }
    }
}
