package com.eastTrip.backendSpringBoot.service;

import com.eastTrip.backendSpringBoot.model.UserPoints;
import com.eastTrip.backendSpringBoot.model.User;
import com.eastTrip.backendSpringBoot.repository.UserPointsRepository;
import com.eastTrip.backendSpringBoot.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class UserPointsService {

    @Autowired
    private UserPointsRepository userPointsRepository;

    @Autowired
    private UserRepository userRepository;

    public List<UserPoints> getAllUserPoints() {
        return userPointsRepository.findAll();
    }

    public Optional<UserPoints> getUserPointsById(int id) {
        return userPointsRepository.findById(id);
    }

//    public List<UserPoints> getPointsByUserId(int userId) {
//        Optional<User> user = userRepository.findById((long) userId);
//        return user.map(userPointsRepository::findByUser).orElseThrow(() -> new RuntimeException("User not found"));
//    }

    public UserPoints addUserPoints(int userId, int points) {
        User user = userRepository.findById((long) userId).orElseThrow(() -> new RuntimeException("User not found"));
        UserPoints userPoints = new UserPoints();
        userPoints.setUser(user);
        userPoints.setPoints(points);
        return userPointsRepository.save(userPoints);
    }

    public UserPoints updateUserPoints(int id, int points) {
        UserPoints userPoints = userPointsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("UserPoints not found"));
        userPoints.setPoints(points);
        return userPointsRepository.save(userPoints);
    }

    public void deleteUserPoints(int id) {
        userPointsRepository.deleteById(id);
    }

    @Transactional
    public UserPoints redeemPoints(Long userId, int pointsToRedeem) {
        UserPoints userPoints = userPointsRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("UserPoints not found for userId: " + userId));

        int currentPoints = userPoints.getPoints() == null ? 0 : userPoints.getPoints();

        if (pointsToRedeem > currentPoints) {
            throw new RuntimeException("Insufficient points. Current points: " + currentPoints);
        }

        userPoints.setPoints(currentPoints - pointsToRedeem);
        return userPointsRepository.save(userPoints);
    }
}
