package com.eastTrip.backendSpringBoot.controller;

import com.eastTrip.backendSpringBoot.service.StatsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/stats")
public class StatsController {

    private final StatsService statsService;

    public StatsController(StatsService statsService) {
        this.statsService = statsService;
    }

    @GetMapping
    public ResponseEntity<Map<String, Long>> getStats() {
        return ResponseEntity.ok(statsService.getStatistics());
    }
}
