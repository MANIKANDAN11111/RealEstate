package com.example.realestatebackend.service;

import com.example.realestatebackend.model.Admin;
import com.example.realestatebackend.repository.AdminRepository;
import com.example.realestatebackend.security.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;
    
    @Autowired
    private JwtUtil jwtUtil;


    public Admin register(Admin admin) {
//        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        return adminRepository.save(admin);
    }
    
    public Admin getAdminDetails(String token) {
        String email = jwtUtil.extractEmail(token);
        return adminRepository.findByEmail(email).orElse(null);
    }

    public Optional<Admin> findByEmail(String email) 
    {
        return adminRepository.findByEmail(email);
    }
}
