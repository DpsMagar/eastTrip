package com.eastTrip.backendSpringBoot.service;

import com.eastTrip.backendSpringBoot.repository.InnBookingRepository;
import com.eastTrip.backendSpringBoot.repository.UserPropertiesRepository;
import com.eastTrip.backendSpringBoot.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class StatsService {

    private final UserRepository userRepository;
    private final UserPropertiesRepository propertiesRepository;
    private final InnBookingRepository bookingRepository;

    public StatsService(UserRepository userRepository,
                        UserPropertiesRepository propertiesRepository,
                        InnBookingRepository bookingRepository) {
        this.userRepository = userRepository;
        this.propertiesRepository = propertiesRepository;
        this.bookingRepository = bookingRepository;
    }

    public Map<String, Long> getStatistics() {
        Map<String, Long> stats = new HashMap<>();
        stats.put("totalUsers", userRepository.countAllUsers());
        stats.put("totalProperties", propertiesRepository.countAllProperties());
        stats.put("activeBookings", bookingRepository.countActiveBookings());
        return stats;
    }
}
