package com.eastTrip.backendSpringBoot.service;

import com.eastTrip.backendSpringBoot.dto.ProfileDTO;
import com.eastTrip.backendSpringBoot.model.User;
import com.eastTrip.backendSpringBoot.model.UserPoints;
import com.eastTrip.backendSpringBoot.repository.UserPointsRepository;
import com.eastTrip.backendSpringBoot.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserProfileService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserPointsRepository userPointsRepository;

    public ProfileDTO getUserProfileById(Long id) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isEmpty()) return null;

        User user = optionalUser.get();

        ProfileDTO dto = new ProfileDTO();
        dto.setFullName(user.getFullName());
        dto.setEmail(user.getEmail());
        dto.setPhone(String.valueOf(user.getPhoneNumber()));
        dto.setAddress(user.getAddress());
        dto.setCountry(user.getCountry());
        dto.setGender(user.getGender());
        dto.setDateOfBirth(user.getDateOfBirth());
        dto.setProfileImage(user.getProfileImage());

        UserPoints points = user.getUserPoints();
        dto.setRewardPoints(points != null ? points.getPoints() : 0);

        return dto;
    }

    public boolean updateUserProfileById(Long id, ProfileDTO dto) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isEmpty()) return false;

        User user = optionalUser.get();

        if (dto.getFullName() != null) user.setFullName(dto.getFullName());
        if (dto.getEmail() != null) user.setEmail(dto.getEmail());
        if (dto.getPhone() != null) user.setPhoneNumber(Integer.parseInt(dto.getPhone()));
        if (dto.getAddress() != null) user.setAddress(dto.getAddress());
        if (dto.getCountry() != null) user.setCountry(dto.getCountry());
        if (dto.getGender() != null) user.setGender(dto.getGender());
        if (dto.getDateOfBirth() != null) user.setDateOfBirth(dto.getDateOfBirth());
        if (dto.getProfileImage() != null) user.setProfileImage(dto.getProfileImage());

        UserPoints points = user.getUserPoints();
        if (points == null) {
            points = new UserPoints();
            points.setUser(user);
        }
        points.setPoints(dto.getRewardPoints());
        user.setUserPoints(points);

        userRepository.save(user);
        return true;
    }



}
