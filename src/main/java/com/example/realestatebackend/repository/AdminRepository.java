package com.example.realestatebackend.repository;



import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.realestatebackend.model.Admin;

import java.util.Optional;

public interface AdminRepository extends MongoRepository<Admin, String>
{
    Optional<Admin> findByEmail(String email);
}
