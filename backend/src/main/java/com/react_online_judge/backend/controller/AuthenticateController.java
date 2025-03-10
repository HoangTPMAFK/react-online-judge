package com.react_online_judge.backend.controller;

import com.nimbusds.jose.JOSEException;
import com.react_online_judge.backend.dto.request.AuthenticateRequest;
import com.react_online_judge.backend.dto.request.IntrospectRequest;
import com.react_online_judge.backend.dto.response.APIResponse;
import com.react_online_judge.backend.dto.response.AuthenticateResponse;
import com.react_online_judge.backend.dto.response.IntrospectReponse;
import com.react_online_judge.backend.service.AuthenticateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@RestController
@RequestMapping("/api/auth")
public class AuthenticateController {

    @Autowired
    AuthenticateService authenticateService;

    @PostMapping("/login")
    APIResponse<AuthenticateResponse> authenticate(@RequestBody AuthenticateRequest request) {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        passwordEncoder.encode(request.getPassword());
        return APIResponse.<AuthenticateResponse>builder()
                .data(authenticateService.authenticate(request))
                .build();
    }

    @PostMapping("/introspect")
    APIResponse<IntrospectReponse> introspect(@RequestHeader("Authorization") String token) {
        return APIResponse.<IntrospectReponse>builder()
                .data(authenticateService.introspect(token))
                .build();
    }

    @PostMapping("/logout")
    APIResponse<AuthenticateResponse> logout(@RequestHeader("Authorization") String token) throws ParseException, JOSEException {
        authenticateService.logout(token);
        return APIResponse.<AuthenticateResponse>builder()
                .message("Successfully logged out")
                .build();
    }
}
