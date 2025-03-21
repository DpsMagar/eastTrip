package com.eastTrip.backendSpringBoot.service;

import com.eastTrip.backendSpringBoot.dto.UserRegisterDTO;
import com.eastTrip.backendSpringBoot.model.User;
import com.eastTrip.backendSpringBoot.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service

public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
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
}
