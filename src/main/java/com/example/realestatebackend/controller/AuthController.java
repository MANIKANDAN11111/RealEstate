package com.example.realestatebackend.controller;


import com.example.realestatebackend.model.Admin;
import com.example.realestatebackend.security.JwtUtil;
import com.example.realestatebackend.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
//@RequestMapping("/auth")
//@CrossOrigin(origins="*")
public class AuthController {

    @Autowired
    private AdminService adminService;

//    @Autowired
//    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("auth/register")
    public ResponseEntity<?> register(@RequestBody Admin admin)
    {
        Admin saved = adminService.register(admin);
        return ResponseEntity.ok("Registered Successfull\n"+saved);
    }

    @PostMapping("auth/login")
    public ResponseEntity<?> login(@RequestBody Admin admin) 
    {
        Admin storedAdmin = adminService.findByEmail(admin.getEmail())
                .orElse(null);
        
        System.out.println("***************"+storedAdmin.getPassword()+"*****stored admin");
        System.out.println("***************"+admin.getPassword()+"*****stored admin");

        
        if (storedAdmin == null)
            return ResponseEntity.badRequest().body("Admin not found");

        if (!admin.getPassword().equals(storedAdmin.getPassword()))
            return ResponseEntity.badRequest().body("Invalid password");
        
        if(storedAdmin.getStatus().equals("Inactive"))
        {
        	return ResponseEntity.badRequest().body("Your Status is Inactive");
        }

        String token = jwtUtil.generateToken(admin.getEmail());

        return ResponseEntity.ok(token);
    }
    
    @GetMapping("admin/getadmindetails")
    public ResponseEntity<?> getAdminDetails(@RequestHeader("Authorization") String authHeader) 
    {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body("Missing or invalid token");
        }

        String token = authHeader.substring(7); // Remove "Bearer "
        Admin admin = adminService.getAdminDetails(token);

        if (admin == null) {
            return ResponseEntity.status(404).body("Admin not found");
        }

        return ResponseEntity.ok(admin);
    }

}
