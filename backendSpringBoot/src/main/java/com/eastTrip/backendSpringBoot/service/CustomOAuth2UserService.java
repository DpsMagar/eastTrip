package com.eastTrip.backendSpringBoot.service;

import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.stereotype.Service;
import com.eastTrip.backendSpringBoot.repository.UserRepository;
import com.eastTrip.backendSpringBoot.model.User;
import com.eastTrip.backendSpringBoot.model.Role;
import java.util.Map;
import java.util.Optional;

import org.springframework.transaction.annotation.Transactional;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    public CustomOAuth2UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) {
        System.out.println("CustomOAuth2UserService: loadUser() method called!");

        OAuth2User oAuth2User = super.loadUser(userRequest);
        Map<String, Object> attributes = oAuth2User.getAttributes();
        System.out.println("OAuth2 User Attributes: " + attributes);

        String email = (String) attributes.get("email");
        String name = (String) attributes.get("name");
//        String profilePicture = (String) attributes.get("picture");

        // Log for debugging
        System.out.println("Google Login Response:");
        System.out.println("Email: " + email);
        System.out.println("Name: " + name);
//        System.out.println("Profile Picture: " + profilePicture);

        createOrUpdateUser(email, name); // Call a separate transactional method

        return oAuth2User;
    }

    @Transactional
    public void createOrUpdateUser(String email, String name) {
        Optional<User> existingUser = userRepository.findByEmail(email);
        if (existingUser.isEmpty()) {
            User newUser = new User();
            newUser.setFullName(name);
            newUser.setEmail(email);
            newUser.setProvider("google"); // Set the provider to "google"
            newUser.setRole(Role.USER); // Set a default role, like USER
            userRepository.save(newUser);
            System.out.println("User saved to the database: " + newUser);
        } else {
            System.out.println("User already exists in the database: " + existingUser.get());
        }
    }
}
