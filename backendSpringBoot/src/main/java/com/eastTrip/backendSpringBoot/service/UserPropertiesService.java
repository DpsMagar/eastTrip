package com.eastTrip.backendSpringBoot.service;

import com.eastTrip.backendSpringBoot.model.userProperties;
import com.eastTrip.backendSpringBoot.repository.UserPropertiesRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserPropertiesService {

    private final UserPropertiesRepository repository;

    public UserPropertiesService(UserPropertiesRepository repository) {
        this.repository = repository;
    }

    public List<userProperties> getAll() {
        return repository.findAll();
    }

    public Optional<userProperties> getById(Long id) {
        return repository.findById(id);
    }

    public List<userProperties> getByUserId(Integer userId) {
        return repository.findByUserId(userId);
    }

    public userProperties create(userProperties property) {
        return repository.save(property);
    }

    public userProperties update(Long id, userProperties updated) {
        return repository.findById(id)
                .map(existing -> {
                    existing.setUserId(updated.getUserId());
                    existing.setPropertyId(updated.getPropertyId());
                    existing.setPropertyType(updated.getPropertyType());
                    existing.setListed(updated.isListed());
                    return repository.save(existing);
                }).orElseThrow(() -> new RuntimeException("Property not found"));
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
