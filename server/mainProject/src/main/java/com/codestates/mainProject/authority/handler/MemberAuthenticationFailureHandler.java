package com.codestates.mainProject.authority.handler;

import com.codestates.mainProject.exception.ExceptionCode;
import com.codestates.mainProject.response.ErrorResponse;
import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
public class MemberAuthenticationFailureHandler implements AuthenticationFailureHandler {
    @Override
    public void onAuthenticationFailure(HttpServletRequest request,
                                        HttpServletResponse response,
                                        AuthenticationException exception) throws IOException{
        log.error("# Authentication failed: {}", exception.getMessage());
        sendErrorResponse(response, exception);
    }

    private void sendErrorResponse(HttpServletResponse response, AuthenticationException exception) throws IOException{
        Gson gson = new Gson();
        String errMessage;
        if(exception instanceof BadCredentialsException){
            errMessage = "password does not match";
        } else if (exception.getMessage().equals(ExceptionCode.MEMBER_NOT_FOUND.getMessage())) {
            errMessage = exception.getMessage();
        } else {
            errMessage = "Unauthorized";
        }
        ErrorResponse errorResponse = ErrorResponse.of(HttpStatus.UNAUTHORIZED, errMessage);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.getWriter().write(gson.toJson(errorResponse, ErrorResponse.class));
    }
}
