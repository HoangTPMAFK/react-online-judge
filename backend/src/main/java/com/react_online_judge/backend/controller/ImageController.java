package com.react_online_judge.backend.controller;

import com.react_online_judge.backend.dto.response.APIResponse;
import com.react_online_judge.backend.exception.AppException;
import com.react_online_judge.backend.exception.ErrorCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.io.DefaultResourceLoader;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/image")
public class ImageController {
    private ResourceLoader resourceLoader = new DefaultResourceLoader();

    @GetMapping("/{imgName}")
    public APIResponse<Resource> getImage(@PathVariable String imgName) {
        Resource resource = resourceLoader.getResource("classpath:src/main/resources/statics/uploads/"+imgName);
        if (!resource.exists()) {
            throw new AppException(ErrorCode.RESOURCE_NOT_FOUND);
        }
        return APIResponse.<Resource>builder()
                .data(resource)
                .build();
    }
}
