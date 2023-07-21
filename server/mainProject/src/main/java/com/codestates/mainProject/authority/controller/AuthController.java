package com.codestates.mainProject.authority.controller;


import com.codestates.mainProject.authority.jwt.JwtTokenReGenerator;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@RestController
public class AuthController {
    private final JwtTokenReGenerator jwtTokenReGenerator;
    public AuthController(JwtTokenReGenerator jwtTokenReGenerator) {
        this.jwtTokenReGenerator = jwtTokenReGenerator;
    }

    @PostMapping("/refresh")
    public ResponseEntity validateRefreshToken(HttpServletRequest request){
        Map<String, String> response = jwtTokenReGenerator.validateRefreshToken(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    @PostMapping("/authentication")
    public ResponseEntity validateAuthenticationToken(HttpServletRequest request){
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
