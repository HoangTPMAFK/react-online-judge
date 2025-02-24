package com.react_online_judge.backend.service;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import com.react_online_judge.backend.dto.request.AuthenticateRequest;
import com.react_online_judge.backend.dto.request.IntrospectRequest;
import com.react_online_judge.backend.dto.response.AuthenticateResponse;
import com.react_online_judge.backend.dto.response.IntrospectReponse;
import com.react_online_judge.backend.entity.*;
import com.react_online_judge.backend.exception.AppException;
import com.react_online_judge.backend.exception.ErrorCode;
import com.react_online_judge.backend.repository.UserRepository;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.time.Instant;
import java.util.*;

@Slf4j
@RequiredArgsConstructor
@Service
public class AuthenticateService {
    private final UserRepository userRepository;

    @Value("${jwt.secret-key}")
    private String SECRET_KEY;

    public AuthenticateResponse authenticate(AuthenticateRequest request) {
        User user = userRepository.findByUsername(request.getUsername()).orElse(null);
        if (user == null) {
            return AuthenticateResponse.builder()
                    .isAuthenticated(false)
                    .build();
        }
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        boolean isAuthenticated = passwordEncoder.matches(request.getPassword(), user.getPassword());
        if (!isAuthenticated) {
            throw new AppException(ErrorCode.UNAUTHORIZED);
        } else {
            return AuthenticateResponse.builder()
                    .isAuthenticated(true)
                    .token(generateToken(user))
                    .build();
        }
    }
    public IntrospectReponse introspect(IntrospectRequest request) {
        String token = request.getToken();
        try {
            var jwtToken = verifiedToken(token, false);
            return IntrospectReponse.builder()
                    .valid(true)
                    .build();
        } catch (Exception e) {
            e.printStackTrace();
            return IntrospectReponse.builder()
                    .valid(false)
                    .build();
        }
    }
    public String generateToken(User user) {
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS256);
        Set<Permission> permissions = new HashSet<>();
        user.getRoles().forEach(role -> role.getRolePermissions().forEach( permission -> permissions.add(permission)));
        String perissionsString = permissionsToString(permissions);
        JWTClaimsSet claimsSet = new JWTClaimsSet.Builder()
                .subject(user.getUsername())
                .issuer("http://localhost:8080")
                .issueTime(new Date(Instant.now().toEpochMilli()))
                .expirationTime(new Date(Instant.now().toEpochMilli() + 24 * 60 * 60 * 1000))
                .claim("role", roleToString(user.getRoles()))
                .claim("scope", perissionsString)
                .claim("contest", contestsToString(user.getContestParticipators()))
                .jwtID(UUID.randomUUID().toString())
                .build();
        Payload payload = new Payload(claimsSet.toJSONObject());
        JWSObject jwsObject = new JWSObject(header, payload);
        try {
            jwsObject.sign(new MACSigner(SECRET_KEY.getBytes()));
            return jwsObject.serialize();
        } catch (JOSEException e) {
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }
    }
    public SignedJWT verifiedToken(String token, boolean isRefresh) throws ParseException, JOSEException {
        JWSVerifier verifier = new MACVerifier(SECRET_KEY.getBytes());
        SignedJWT signedJWT = SignedJWT.parse(token);
        Date expiration = (isRefresh) ?
                new Date(signedJWT.getJWTClaimsSet().getIssueTime().toInstant().plusSeconds((86400 + 3600)).toEpochMilli()) :
                signedJWT.getJWTClaimsSet().getExpirationTime();
        boolean valid = signedJWT.verify(verifier);
        if (valid && expiration.after(new Date(Instant.now().toEpochMilli()))) {
            return signedJWT;
        } else {
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }
    }
    public String permissionsToString(Set<Permission> convertor) {
        StringJoiner joiner = new StringJoiner(" ");
        convertor.forEach(item -> joiner.add(item.getName()));
        return joiner.toString();
    }
    public String roleToString(Set<Role> convertor) {
        StringJoiner joiner = new StringJoiner(" ");
        convertor.forEach(item -> joiner.add(item.getName()));
        return joiner.toString();
    }
    public String contestsToString(Set<ContestParticipator> convertor) {
        StringJoiner joiner = new StringJoiner(" ");
        convertor.forEach(item -> joiner.add(item.getContest().getId() + ""));
        return joiner.toString();
    }
}
