package com.eastTrip.backendSpringBoot.controller;

import com.eastTrip.backendSpringBoot.dto.ProfileDTO;
import com.eastTrip.backendSpringBoot.dto.UserDTO;
import com.eastTrip.backendSpringBoot.dto.UserListResponseDTO;
import com.eastTrip.backendSpringBoot.dto.UserWithPropertyCount;
import com.eastTrip.backendSpringBoot.service.UserProfileService;
import com.eastTrip.backendSpringBoot.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private final UserProfileService profileService;

    @Autowired
    private UserService userService;

    public UserController(UserProfileService profileService) {
        this.profileService = profileService;
    }

    // Get all users
    @GetMapping
    public List<UserDTO> getAllUsers() {
        return userService.getAllUsers();
    }

    // Get user by ID
    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Delete user by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        if (userService.deleteUserById(id)) {
            return ResponseEntity.ok("User deleted successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/all-with-count")
    public ResponseEntity<UserListResponseDTO> getAllUsersWithCount() {
        return ResponseEntity.ok(userService.getAllUsersWithCount());
    }

    @GetMapping("/with-properties")
    public ResponseEntity<List<UserWithPropertyCount>> getUsersWithProperties() {
        List<UserWithPropertyCount> users = userService.getUsersWithPropertyCounts();
        return ResponseEntity.ok(users);
    }
    @GetMapping("/id/{id}")
    public ResponseEntity<ProfileDTO> getProfileById(@PathVariable Long id) {
        ProfileDTO dto = profileService.getUserProfileById(id);
        if (dto == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(dto);
    }
    @PutMapping("/id/{id}")
    public ResponseEntity<String> updateProfileById(@PathVariable Long id, @RequestBody ProfileDTO dto) {
        boolean updated = profileService.updateUserProfileById(id, dto);
        if (!updated) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok("Profile updated successfully");
    }

}
