package com.eastTrip.backendSpringBoot.controller;

import com.eastTrip.backendSpringBoot.dto.UserRegisterDTO;
import com.eastTrip.backendSpringBoot.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class RegisterController {
    private final UserService userService;

    @Autowired
    public RegisterController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody UserRegisterDTO userRegisterDTO){
        return ResponseEntity.ok(userService.registerUser( userRegisterDTO));
    }

}
