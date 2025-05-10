package com.eastTrip.backendSpringBoot.config;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary cloudinary() {
        return new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "trippy",
                "api_key", "353416112417578",
                "api_secret", "MOSjCKELQlC8JTgCOxalbDjCfSQ"
        ));
    }
}
