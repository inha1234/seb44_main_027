package com.codestates.mainProject.authority.jwt;

import com.codestates.mainProject.authority.service.AuthService;
import com.codestates.mainProject.exception.BusinessLogicException;
import com.codestates.mainProject.exception.ExceptionCode;
import com.codestates.mainProject.member.entity.Member;
import com.codestates.mainProject.member.repository.MemberRepository;
import com.codestates.mainProject.utils.redis.service.RedisService;
import io.jsonwebtoken.Claims;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
@Component
public class JwtTokenReGenerator{
    private final AuthService authService;
    private final MemberRepository memberRepository;
    private final JwtTokenGenerator jwtTokenGenerator;
    private final RedisService redisService;

    public JwtTokenReGenerator(AuthService authService, MemberRepository memberRepository, JwtTokenGenerator jwtTokenGenerator, RedisService redisService) {
        this.authService = authService;
        this.memberRepository = memberRepository;
        this.jwtTokenGenerator = jwtTokenGenerator;
        this.redisService = redisService;
    }
    public Map<String, String> validateRefreshToken(HttpServletRequest request){
        String headerRefresh = request.getHeader("Refresh");
        Claims claims = authService.parserToken(headerRefresh);
        String email = claims.getSubject();
        Date expiration = claims.getExpiration();
        Date now = new Date();
        if(expiration.before(now)){
            throw new BusinessLogicException(ExceptionCode.TOKEN_HAS_EXPIRED);
        }
        if(redisService.hasKeyRefreshToken(email,headerRefresh)){
            Member member = memberRepository.findByEmail(email).orElseThrow(()->
                    new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
            String accessToken = jwtTokenGenerator.delegateAccessToken(member);
            String refreshToken = jwtTokenGenerator.delegateRefreshToken(member);

            Map<String, String> response = new HashMap<>();
            response.put("Authorization", "Bearer " + accessToken);
            response.put("Refresh", refreshToken);

            redisService.setRefreshToken(email, refreshToken, 90);
            return response;
        }
        throw new BusinessLogicException(ExceptionCode.TOKEN_HAS_EXPIRED);
    }
}
