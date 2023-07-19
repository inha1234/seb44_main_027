package com.codestates.mainProject.authority.controller;


import com.codestates.mainProject.authority.service.AuthService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@Slf4j
@RestController
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/Refresh")
    public ResponseEntity validateRefreshToken(HttpServletRequest request){
        return authService.validateRefreshToken(request);
    }
}
