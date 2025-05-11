package com.eastTrip.backendSpringBoot.service;

import com.eastTrip.backendSpringBoot.dto.UserDTO;
import com.eastTrip.backendSpringBoot.dto.UserListResponseDTO;
import com.eastTrip.backendSpringBoot.dto.UserWithPropertyCount;
import com.eastTrip.backendSpringBoot.model.User;
import com.eastTrip.backendSpringBoot.repository.UserPropertiesRepository;
import com.eastTrip.backendSpringBoot.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    UserPropertiesRepository userPropertiesRepository;


    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(user -> new UserDTO(user.getId(), user.getFullName(), user.getEmail()))
                .collect(Collectors.toList());
    }

    public Optional<UserDTO> getUserById(Long id) {
        return userRepository.findById(id)
                .map(user -> new UserDTO(user.getId(), user.getFullName(), user.getEmail()));
    }

    public boolean deleteUserById(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }
    public UserListResponseDTO getAllUsersWithCount() {
        List<UserDTO> users = userRepository.findAll().stream()
                .map(user -> new UserDTO(user.getId(), user.getFullName(), user.getEmail()))
                .collect(Collectors.toList());
        long count = users.size();
        return new UserListResponseDTO(users, count);
    }

//    public List<UserWithPropertyCount> getUsersWithProperties() {
//        List<Long> userIds = userPropertiesRepository.findDistinctUserIds();
//
//        List<User> users = userRepository.findAllById(userIds);
//
//        return users.stream()
//                .map(user -> new UserWithPropertyCount(
//                        user.getId(),
//                        user.getFullName(),
//                        user.getEmail(),
//
//
//                ))
//                .collect(Collectors.toList());
//    }
public List<UserWithPropertyCount> getUsersWithPropertyCounts() {
    return userPropertiesRepository.findUsersWithPropertyCounts();
}
}
