package com.react_online_judge.backend.service;

import com.nimbusds.jose.JOSEException;
import com.react_online_judge.backend.dto.request.AccountUpdateRequest;
import com.react_online_judge.backend.dto.request.IntrospectRequest;
import com.react_online_judge.backend.dto.request.UserCreationRequest;
import com.react_online_judge.backend.dto.request.UserUpdateRequest;
import com.react_online_judge.backend.dto.response.IntrospectReponse;
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
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserService {
    UserRepository userRepository;
    UserMapper userMapper;
    AuthenticateService authenticateService;
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
            PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
            user.setPassword(passwordEncoder.encode(request.getPassword()));
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
            PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            user = userRepository.save(user);
            return userMapper.toUserResponse(user);
        } catch (DataIntegrityViolationException e) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }
    }
    public UserResponse updateAccount(String token, AccountUpdateRequest request) {
        try {
            log.info("Request: {}", request.toString());
            User user = authenticateService.getUserFromToken(token);

            PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
            if (request.getPassword() == null) {throw new AppException(ErrorCode.WRONG_PASSWORD);}
            if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                throw new AppException(ErrorCode.WRONG_PASSWORD);
            }
            userMapper.updateUser(user, request);
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            IntrospectReponse introspect = authenticateService.introspect(IntrospectRequest.builder().token(token).build());
            if (introspect.isValid()) {
                if (request.getNewPassword() != null) {
                    if (request.getNewPassword().length() >= 8) {
                        passwordEncoder = new BCryptPasswordEncoder(10);
                        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
                    }
                }
                return userMapper.toUserResponse(userRepository.save(user));
            } else {
                throw new AppException(ErrorCode.UNAUTHENTICATED);
            }
        } catch (ParseException | JOSEException e) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }
    }
    public  void deleteAccount(String token) {
        try {
            User user = authenticateService.getUserFromToken(token);
            authenticateService.logout(token);
            userRepository.delete(user);
        } catch (ParseException | JOSEException e) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }
    }
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
