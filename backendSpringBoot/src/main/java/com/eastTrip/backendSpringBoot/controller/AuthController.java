package com.eastTrip.backendSpringBoot.controller;

import com.eastTrip.backendSpringBoot.dto.AuthResponseDTO;
import com.eastTrip.backendSpringBoot.dto.UserRegisterDTO;
import com.eastTrip.backendSpringBoot.model.User;
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
        String token = authService.registerUser(userRegisterDTO);
        return ResponseEntity.ok(token);
    }

    @PostMapping("/login")
//    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
    public ResponseEntity<?> login(@RequestBody User user) {
//        AuthResponseDTO authResponse = authService.authenticate(credentials.get("email"), credentials.get("password"))
        AuthResponseDTO authResponse = authService.authenticate(user)
                .orElse(null);

        if (authResponse != null) {
            return ResponseEntity.ok(authResponse);
        } else {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
        }
    }

}
