package com.codestates.mainProject.config;

import com.codestates.mainProject.authority.handler.MemberAccessDeniedHandler;
import com.codestates.mainProject.authority.handler.MemberAuthenticationEntryPoint;
import com.codestates.mainProject.authority.handler.MemberAuthenticationFailureHandler;
import com.codestates.mainProject.authority.handler.MemberAuthenticationSuccessHandler;
import com.codestates.mainProject.authority.jwt.*;
import com.codestates.mainProject.authority.service.AuthService;
import com.codestates.mainProject.authority.util.AuthorityUtil;
import com.codestates.mainProject.member.repository.MemberRepository;
import com.codestates.mainProject.utils.redis.service.RedisService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
public class SecurityConfiguration{
    private final JwtTokenizer jwtTokenizer;
    private final AuthorityUtil authorityUtil;
    private final RedisService redisService;
    private final MemberRepository memberRepository;
    private final JwtTokenGenerator jwtTokenGenerator;
    private final AuthService authService;

    public SecurityConfiguration(JwtTokenizer jwtTokenizer, AuthorityUtil authorityUtil, RedisService redisService,
                                 MemberRepository memberRepository, JwtTokenGenerator jwtTokenGenerator, AuthService authService) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtil = authorityUtil;
        this.redisService = redisService;
        this.memberRepository = memberRepository;
        this.jwtTokenGenerator = jwtTokenGenerator;
        this.authService = authService;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
       http
               .headers().frameOptions().sameOrigin()
               .and()
               .csrf().disable()
               .cors(withDefaults())
               .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
               .and()
               .formLogin().disable()
               .httpBasic().disable()
               .exceptionHandling()
               .authenticationEntryPoint(new MemberAuthenticationEntryPoint())
               .accessDeniedHandler(new MemberAccessDeniedHandler())
               .and()
               .apply(new CustomFilterConfigurer())
               .and()
               .authorizeHttpRequests(authorize -> authorize
                       .antMatchers(HttpMethod.POST, "/members").permitAll()
                       .antMatchers(HttpMethod.POST, "/authentication").hasRole("USER")
                       .antMatchers(HttpMethod.POST, "/members/logOut").hasRole("USER")
                       .antMatchers(HttpMethod.POST,"/posts").hasRole("USER")
                       .antMatchers(HttpMethod.POST,"/follows").hasRole("USER")
                       .antMatchers(HttpMethod.POST,"/crewings").hasRole("USER")
                       .antMatchers(HttpMethod.POST,"/crewings/apply/**").hasRole("USER")
                       .antMatchers(HttpMethod.POST,"/comments").hasRole("USER")
                       .antMatchers(HttpMethod.PUT, "/**").hasRole("USER")
                       .antMatchers(HttpMethod.DELETE, "/**").hasRole("USER")
                       .anyRequest().permitAll()
               );

        return http.build();
    }
    @Bean
    public CorsConfigurationSource corsConfigurationSource(){
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173", "http://main027.s3-website.ap-northeast-2.amazonaws.com/"));
        configuration.setAllowedMethods(Arrays.asList("GET","POST","PUT","DELETE"));
        configuration.addAllowedMethod("*");
        configuration.addAllowedHeader("*");
        configuration.addExposedHeader("Authorization");
        configuration.addExposedHeader("Refresh");
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity>{
       @Override
        public void configure(HttpSecurity builder) throws Exception{
           AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

           JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer, redisService, jwtTokenGenerator);
           jwtAuthenticationFilter.setFilterProcessesUrl("/members/login");
           jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler());
           jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());

           JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtil, redisService, memberRepository);

           builder
                   .addFilter(jwtAuthenticationFilter)
                   .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);
       }
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }
}