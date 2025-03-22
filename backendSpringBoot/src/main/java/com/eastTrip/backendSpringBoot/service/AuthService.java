package com.eastTrip.backendSpringBoot.service;

import com.eastTrip.backendSpringBoot.dto.UserRegisterDTO;
import com.eastTrip.backendSpringBoot.model.User;
import com.eastTrip.backendSpringBoot.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service

public class AuthService {

    private final UserRepository userRepository;

    @Autowired
    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String registerUser(UserRegisterDTO userRegisterDTO) {

        if(userRepository.existsByEmail(userRegisterDTO.getEmail())){
            return "Email Already Exists";
        }

        if(userRepository.existsByFullName(userRegisterDTO.getFullName())){
            return "Full Name Already Exists";
        }

        if(!userRegisterDTO.getPassword().equals(userRegisterDTO.getConfirmPassword())){
            return "Password Not Match";
        }

        User user = new User();
        user.setEmail(userRegisterDTO.getEmail());
        user.setFullName(userRegisterDTO.getFullName());
        user.setPassword(userRegisterDTO.getPassword());
        userRepository.save(user);

        return "User Registered Successfully";
    }

    public String loginUser(String email, String password) {

            User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        if (!password.equals(user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        return "Successfully logged in";

    }
}
