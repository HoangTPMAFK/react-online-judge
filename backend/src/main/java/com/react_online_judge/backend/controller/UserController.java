package com.react_online_judge.backend.controller;

import com.react_online_judge.backend.dto.request.UserCreationRequest;
import com.react_online_judge.backend.dto.request.UserUpdateRequest;
import com.react_online_judge.backend.dto.response.APIResponse;
import com.react_online_judge.backend.dto.response.UserResponse;
import com.react_online_judge.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user/")
public class UserController {
    @Autowired
    private UserService userService;
    @GetMapping("/")
    APIResponse<List<UserResponse>> getAllUsers() {
        return APIResponse.<List<UserResponse>>builder()
                .data(userService.getAllUsers())
                .build();
    }
    @GetMapping("/?user={userId}/")
    APIResponse<UserResponse> getUserById(@PathVariable Long userId) {
        return APIResponse.<UserResponse>builder()
                .data(userService.getUserById(userId))
                .build();
    }
    @PostMapping("/")
    APIResponse<UserResponse> createUser(@RequestBody UserCreationRequest request) {
        return APIResponse.<UserResponse>builder()
                .data(userService.createUser(request))
                .build();
    }
    @PutMapping("/?user={userId}/")
    APIResponse<UserResponse> updateUserById(@PathVariable Long userId, @RequestBody UserUpdateRequest request) {
        UserResponse response = userService.updateUser(userId, request);
        return APIResponse.<UserResponse>builder()
                .data(response)
                .build();
    }
    @DeleteMapping("/?user={userId/")
    APIResponse<UserResponse> deleteUserById(@PathVariable Long userId) {
        userService.deleteUser(userId);
        return APIResponse.<UserResponse>builder()
                .message("User deleted")
                .build();
    }
    @GetMapping("/my-profile/")
    APIResponse<UserResponse> getMyProfile() {
        return APIResponse.<UserResponse>builder()
                .build();
    }
}
