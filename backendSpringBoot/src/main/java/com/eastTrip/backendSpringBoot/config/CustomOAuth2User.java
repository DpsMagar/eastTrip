package com.eastTrip.backendSpringBoot.config;

import com.eastTrip.backendSpringBoot.model.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CustomOAuth2User implements OAuth2User {
    private final User user;
    private final String token;

    public CustomOAuth2User(User user, String token) {
        this.user = user;
        this.token = token;
    }

    @Override
    public String getName() {
        return user.getEmail();
    }

    @Override
    public Map<String, Object> getAttributes() {
        // Return attributes for OAuth2User
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("email", user.getEmail());
        attributes.put("provider", user.getProvider());
        return attributes;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    public String getToken() {
        return token;
    }
}
