package com.codestates.mainProject.config;

import com.codestates.mainProject.authority.handler.MemberAccessDeniedHandler;
import com.codestates.mainProject.authority.handler.MemberAuthenticationEntryPoint;
import com.codestates.mainProject.authority.handler.MemberAuthenticationFailureHandler;
import com.codestates.mainProject.authority.handler.MemberAuthenticationSuccessHandler;
import com.codestates.mainProject.authority.jwt.JwtAuthenticationFilter;
import com.codestates.mainProject.authority.jwt.JwtTokenizer;
import com.codestates.mainProject.authority.jwt.JwtVerificationFilter;
import com.codestates.mainProject.authority.util.AuthorityUtil;
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

    public SecurityConfiguration(JwtTokenizer jwtTokenizer, AuthorityUtil authorityUtil) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtil = authorityUtil;
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
                       .antMatchers(HttpMethod.PUT, "/members/**").hasRole("USER")
//                       .antMatchers(HttpMethod.GET, "/members/**").hasRole("USER")
                       .antMatchers(HttpMethod.DELETE, "/members/**").hasRole("USER")
                       .anyRequest().permitAll()
               );

        return http.build();
    }
    @Bean
    public CorsConfigurationSource corsConfigurationSource(){
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://main027.s3-website.ap-northeast-2.amazonaws.com/"));
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

           JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer);
           jwtAuthenticationFilter.setFilterProcessesUrl("/members/login");
           jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler());
           jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());

           JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtil);

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