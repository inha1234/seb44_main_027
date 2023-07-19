package com.codestates.mainProject.authority.service;

import com.codestates.mainProject.authority.jwt.JwtTokenizer;
import com.codestates.mainProject.exception.BusinessLogicException;
import com.codestates.mainProject.exception.ExceptionCode;
import com.codestates.mainProject.member.entity.Member;
import com.codestates.mainProject.member.repository.MemberRepository;
import com.codestates.mainProject.utils.redis.service.RedisService;
import io.jsonwebtoken.Claims;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
@Transactional
public class AuthService {
    private final JwtTokenizer jwtTokenizer;
    private final RedisService redisService;
    private final MemberRepository memberRepository;
    public AuthService(JwtTokenizer jwtTokenizer, RedisService redisService, MemberRepository memberRepository) {
        this.jwtTokenizer = jwtTokenizer;
        this.redisService = redisService;
        this.memberRepository = memberRepository;
    }
    public ResponseEntity validateRefreshToken(HttpServletRequest request){
        String headerRefresh = request.getHeader("Refresh");
        Claims claims = parserToken(headerRefresh);
        String email = claims.getSubject();
        Date expiration = claims.getExpiration();
        Date now = new Date();
        if(expiration.before(now)){
            throw new BusinessLogicException(ExceptionCode.TOKEN_HAS_EXPIRED);
        }
        if(redisService.hasKeyRefreshToken(email,headerRefresh)){
            Member member = memberRepository.findByEmail(email).orElseThrow(()->
                    new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
            String accessToken = delegateAccessToken(member);
            String refreshToken = delegateRefreshToken(member);

            Map<String, String> response = new HashMap<>();
            response.put("Authorization", "Bearer " + accessToken);
            response.put("Refresh", refreshToken);

            redisService.setRefreshToken(email, refreshToken, 90);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        }
        throw new BusinessLogicException(ExceptionCode.TOKEN_HAS_EXPIRED);
    }
    public Claims parserToken(String token){
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        return jwtTokenizer.getClaims(token, base64EncodedSecretKey).getBody();
    }
    private String delegateAccessToken(Member member){
        Map<String, Object> claims = new HashMap<>();
        claims.put("email", member.getEmail());
        claims.put("roles", member.getRoles());
        claims.put("memberId", member.getMemberId());

        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodeSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodeSecretKey);

        return accessToken;
    }
    private String delegateRefreshToken(Member member){
        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        return refreshToken;
    }
}
