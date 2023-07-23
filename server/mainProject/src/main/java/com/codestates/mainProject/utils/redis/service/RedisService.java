package com.codestates.mainProject.utils.redis.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.stereotype.Component;

import java.util.concurrent.TimeUnit;

@Component
@RequiredArgsConstructor
public class RedisService {
    private final RedisTemplate<String, Object> redisBlackListTemplate;
    private final RedisTemplate<String, String> refreshTokenTemplate;
    public void setBackList(String key, Object object, int minutes){
        redisBlackListTemplate.setValueSerializer(new Jackson2JsonRedisSerializer(object.getClass()));
        redisBlackListTemplate.opsForValue().set(key, object, minutes, TimeUnit.MINUTES);
    }
    public Object getBlackList(String key){
        return redisBlackListTemplate.opsForValue().get(key);
    }
    public void deleteKey(String key){
        redisBlackListTemplate.delete(key);
    }
    public boolean hasKey(String key){
        return Boolean.TRUE.equals(redisBlackListTemplate.hasKey(key));
    }
    public void setRefreshToken(String key, String value, int minutes){
        refreshTokenTemplate.setValueSerializer(new Jackson2JsonRedisSerializer(value.getClass()));
        refreshTokenTemplate.opsForValue().set(key, value, minutes, TimeUnit.MINUTES);
    }
    public boolean hasKeyRefreshToken(String key, String refreshToken){
        Object valueFromRedis = refreshTokenTemplate.opsForValue().get(key);
        if(valueFromRedis==null){
            return false;
        }
        return valueFromRedis.equals(refreshToken);
    }

    public void redisLogOut(String authentication, int diffInMinutesInt, String email){
        setBackList(authentication,"로그아웃", diffInMinutesInt);
        deleteKey(email);
    }
}
