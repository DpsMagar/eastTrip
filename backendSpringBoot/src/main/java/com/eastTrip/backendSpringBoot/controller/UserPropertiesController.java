package com.eastTrip.backendSpringBoot.controller;

import com.eastTrip.backendSpringBoot.dto.HotelSearchResultsDTO;
import com.eastTrip.backendSpringBoot.model.userProperties;
import com.eastTrip.backendSpringBoot.service.UserPropertiesService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/user-properties")
public class UserPropertiesController {

    private final UserPropertiesService service;

    public UserPropertiesController(UserPropertiesService service) {
        this.service = service;
    }

    @GetMapping
    public List<userProperties> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<userProperties> getById(@PathVariable Long id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public List<HotelSearchResultsDTO> getByUserId(@PathVariable Integer userId) {
        return service.getByUserId(userId);
    }

    @PostMapping
    public userProperties create(@RequestBody userProperties property) {
        return service.create(property);
    }

    @PutMapping("/{id}")
    public ResponseEntity<userProperties> update(@PathVariable Long id, @RequestBody userProperties updated) {
        try {
            return ResponseEntity.ok(service.update(id, updated));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
