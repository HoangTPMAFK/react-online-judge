package com.react_online_judge.backend.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.react_online_judge.backend.dto.request.AccountUpdateRequest;
import com.react_online_judge.backend.dto.request.UserCreationRequest;
import com.react_online_judge.backend.dto.request.UserUpdateRequest;
import com.react_online_judge.backend.dto.response.APIResponse;
import com.react_online_judge.backend.dto.response.UserResponse;
import com.react_online_judge.backend.exception.AppException;
import com.react_online_judge.backend.exception.ErrorCode;
import com.react_online_judge.backend.service.FileValidateService;
import com.react_online_judge.backend.service.UserService;
import org.apache.tika.Tika;
import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private FileValidateService fileValidateService;
    @GetMapping("/")
    APIResponse<List<UserResponse>> getAllUsers() {
        return APIResponse.<List<UserResponse>>builder()
                .data(userService.getAllUsers())
                .build();
    }
    @GetMapping("/{userId}")
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
    @PutMapping("/{userId}")
    APIResponse<UserResponse> updateUserById(@PathVariable Long userId, @RequestBody UserUpdateRequest request) {
        UserResponse response = userService.updateUser(userId, request);
        return APIResponse.<UserResponse>builder()
                .data(response)
                .build();
    }
    @DeleteMapping("/{userId}")
    APIResponse<UserResponse> deleteUserById(@PathVariable Long userId) {
        userService.deleteUser(userId);
        return APIResponse.<UserResponse>builder()
                .message("User deleted")
                .build();
    }
    @PostMapping("/create-account")
    APIResponse<UserResponse> createAccount(@RequestBody UserCreationRequest request) {
        return APIResponse.<UserResponse>builder()
                .data(userService.createAccount(request))
                .build();
    }
    @PutMapping("/my-profile/")
    APIResponse<UserResponse> updateMyProfile(
            @RequestHeader("Authorization") String token,
            @RequestParam("data") String jsonData,
            @RequestParam(value = "file", required = false) MultipartFile avatar
    ) {
        AccountUpdateRequest request = null;
        System.out.println("Received token: " + token);
        System.out.println("Received JSON: " + jsonData);
        System.out.println("Received file: " + (avatar != null ? avatar.getOriginalFilename() : "No file"));
        try {
            if (avatar != null) {
                if (!fileValidateService.isValidMimeType(avatar)) {
                    System.out.println("Invalid file type: " + avatar.getContentType());
                    throw new AppException(ErrorCode.INVALID_REQUEST);
                }
            }
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            objectMapper.configure(DeserializationFeature.READ_DATE_TIMESTAMPS_AS_NANOSECONDS, false);
            request =objectMapper.readValue(jsonData, AccountUpdateRequest.class);
            return APIResponse.<UserResponse>builder()
                    .data(userService.updateAccount(token, request, avatar)) // Nếu avatar null thì truyền null luôn
                    .build();
        } catch (JsonProcessingException e) {
            System.out.println(123);
            throw new AppException(ErrorCode.INVALID_REQUEST);
        }
    }
    @DeleteMapping("/my-profile/")
    APIResponse<UserResponse> deleteMyProfile(@RequestHeader("Authorization") String token) {
        userService.deleteAccount(token);
        return APIResponse.<UserResponse>builder()
                .message("Delete account successfully")
                .build();
    }
}
