package com.react_online_judge.backend.controller;

import com.react_online_judge.backend.dto.response.APIResponse;
import com.react_online_judge.backend.dto.response.UserResponse;
import com.react_online_judge.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/user/")
public class UserController {
    @Autowired
    private UserService userService;
    @GetMapping("/")
    APIResponse<List<UserResponse>> getAllUser() {
        return APIResponse.<List<UserResponse>>builder()
                .data(userService.getAllUsers())
                .build();
    }

}
