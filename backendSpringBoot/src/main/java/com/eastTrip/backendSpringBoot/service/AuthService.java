package com.eastTrip.backendSpringBoot.service;

import com.eastTrip.backendSpringBoot.dto.AuthResponseDTO;
import com.eastTrip.backendSpringBoot.dto.UserRegisterDTO;
import com.eastTrip.backendSpringBoot.model.Role;
import com.eastTrip.backendSpringBoot.model.User;
import com.eastTrip.backendSpringBoot.repository.UserRepository;
import com.eastTrip.backendSpringBoot.util.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service

public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    @Autowired
    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtils jwtUtils) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
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
        user.setRole(Role.USER);
        user.setEmail(userRegisterDTO.getEmail());
        user.setFullName(userRegisterDTO.getFullName());
        user.setPassword(passwordEncoder.encode(userRegisterDTO.getPassword()));
        userRepository.save(user);

        return jwtUtils.generateToken( user);
    }

    public Optional<AuthResponseDTO> authenticate(User user) {
        return userRepository.findByEmail(user.getEmail())
                .filter(authUser -> passwordEncoder.matches(user.getPassword(), authUser.getPassword()))
                .map(authUser -> new AuthResponseDTO(jwtUtils.generateToken(user), authUser.getId()));  // return JWT token and useID
    }
}
