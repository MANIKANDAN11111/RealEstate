package com.example.realestatebackend.config;



import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;



@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) 
    {
        registry.addMapping("/**") // Apply to all API endpoints
//                .allowedOrigins("http://localhost:5173") // 👈 THIS IS THE FIX
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                // 🔑 This is essential because your frontend uses credentials: "include"
                .allowedOriginPatterns("*")
                .allowCredentials(true) 
                .maxAge(3600); // Max age for preflight requests
    }
}
