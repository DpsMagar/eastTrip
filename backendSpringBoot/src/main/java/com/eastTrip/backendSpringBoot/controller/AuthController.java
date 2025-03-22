package com.eastTrip.backendSpringBoot.controller;

import com.eastTrip.backendSpringBoot.dto.UserRegisterDTO;
import com.eastTrip.backendSpringBoot.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody UserRegisterDTO userRegisterDTO){
        return ResponseEntity.ok(authService.registerUser( userRegisterDTO));
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody Map<String, String> requestBody ){
        return ResponseEntity.ok(authService.loginUser(requestBody.get("email"), requestBody.get("password")));
    }

}
