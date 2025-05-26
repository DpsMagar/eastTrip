package com.eastTrip.backendSpringBoot.controller;

import com.eastTrip.backendSpringBoot.model.UserPoints;
import com.eastTrip.backendSpringBoot.service.UserPointsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user-points")
public class UserPointsController {

    @Autowired
    private UserPointsService userPointsService;

    @GetMapping
    public List<UserPoints> getAllUserPoints() {
        return userPointsService.getAllUserPoints();
    }

    @GetMapping("/{id}")
    public Optional<UserPoints> getUserPointsById(@PathVariable int id) {
        return userPointsService.getUserPointsById(id);
    }

//    @GetMapping("/user/{userId}")
//    public List<UserPoints> getPointsByUserId(@PathVariable int userId) {
//        return userPointsService.getPointsByUserId(userId);
//    }

    @PostMapping
    public UserPoints addUserPoints(@RequestParam int userId, @RequestParam int points) {
        return userPointsService.addUserPoints(userId, points);
    }

    @PutMapping("/{id}")
    public UserPoints updateUserPoints(@PathVariable int id, @RequestParam int points) {
        return userPointsService.updateUserPoints(id, points);
    }

    @DeleteMapping("/{id}")
    public void deleteUserPoints(@PathVariable int id) {
        userPointsService.deleteUserPoints(id);
    }
}
