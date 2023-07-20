package com.codestates.mainProject.authority.service;

import com.codestates.mainProject.authority.jwt.JwtTokenizer;
import io.jsonwebtoken.Claims;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
@Service
@Transactional
public class AuthService {
    private final JwtTokenizer jwtTokenizer;
    public AuthService(JwtTokenizer jwtTokenizer) {
        this.jwtTokenizer = jwtTokenizer;
    }
    public Claims parserToken(String token){
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        return jwtTokenizer.getClaims(token, base64EncodedSecretKey).getBody();
    }
}
