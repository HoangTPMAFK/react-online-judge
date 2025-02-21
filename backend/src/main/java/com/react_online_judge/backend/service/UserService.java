package com.react_online_judge.backend.service;

import com.react_online_judge.backend.dto.request.UserCreationRequest;
import com.react_online_judge.backend.dto.request.UserUpdateRequest;
import com.react_online_judge.backend.dto.response.UserResponse;
import com.react_online_judge.backend.entity.User;
import com.react_online_judge.backend.exception.AppException;
import com.react_online_judge.backend.exception.ErrorCode;
import com.react_online_judge.backend.mapper.UserMapper;
import com.react_online_judge.backend.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserService {
    UserRepository userRepository;
    UserMapper userMapper;
    public UserResponse getUserById(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        return userMapper.toUserResponse(user);
    }
    public UserResponse getUserByEmail(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        return userMapper.toUserResponse(user);
    }
    public UserResponse getUserByUsername(String username) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        return userMapper.toUserResponse(user);
    }
    public List<UserResponse> getParticipators(Long contestId) {
        List<User> users = userRepository.findByContestId(contestId);
        return userMapper.toUserResponseList(users);
    }
    public List<UserResponse> getUsersByRole(String role) {
        List<User> users = userRepository.findByRole(role);
        return userMapper.toUserResponseList(users);
    }
    public List<UserResponse> getAllUsers() {
        List<User> users = userRepository.findAll();
        return userMapper.toUserResponseList(users);
    }
    public UserResponse createUser(UserCreationRequest request) {
        User user = userMapper.toUser(request);
        try {
            user = userRepository.save(user);
            return userMapper.toUserResponse(user);
        } catch (DataIntegrityViolationException e) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }
    }
    public UserResponse updateUser(Long id, UserUpdateRequest request)  {
        User user = userRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        userMapper.updateUser(user, request);
        try {
            user = userRepository.save(user);
            return userMapper.toUserResponse(user);
        } catch (DataIntegrityViolationException e) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }
    }
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
