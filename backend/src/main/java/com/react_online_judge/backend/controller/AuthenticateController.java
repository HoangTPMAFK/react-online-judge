package com.react_online_judge.backend.controller;

import com.react_online_judge.backend.dto.request.AuthenticateRequest;
import com.react_online_judge.backend.dto.request.IntrospectRequest;
import com.react_online_judge.backend.dto.response.APIResponse;
import com.react_online_judge.backend.dto.response.AuthenticateResponse;
import com.react_online_judge.backend.dto.response.IntrospectReponse;
import com.react_online_judge.backend.service.AuthenticateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    APIResponse<IntrospectReponse> introspect(@RequestBody IntrospectRequest request) {
        return APIResponse.<IntrospectReponse>builder()
                .data(authenticateService.introspect(request))
                .build();
    }
}
