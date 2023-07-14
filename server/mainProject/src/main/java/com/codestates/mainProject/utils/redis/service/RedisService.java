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

    public void setBackList(String key, Object object, int minutes){
        redisBlackListTemplate.setValueSerializer(new Jackson2JsonRedisSerializer(object.getClass()));
        redisBlackListTemplate.opsForValue().set(key, object, minutes, TimeUnit.MINUTES);
    }
    public Object getBlackList(String key){
        return redisBlackListTemplate.opsForValue().get(key);
    }
    public boolean deleteBlackList(String key){
        return Boolean.TRUE.equals(redisBlackListTemplate.delete(key));
    }
    public boolean hasKeyBlackList(String key){
        return Boolean.TRUE.equals(redisBlackListTemplate.hasKey(key));
    }
}
