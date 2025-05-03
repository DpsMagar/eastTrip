package com.eastTrip.backendSpringBoot.controller;


import com.eastTrip.backendSpringBoot.dto.HomeStayResultsDTO;
import com.eastTrip.backendSpringBoot.dto.ListHotelNamesDTO;
import com.eastTrip.backendSpringBoot.model.HomeStay;
import com.eastTrip.backendSpringBoot.service.HomeStayResultsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/results/homeStay")
public class HomeStayController {

    private final HomeStayResultsService homeStayResultsService;

    public HomeStayController(HomeStayResultsService homeStayResultsService) {
        this.homeStayResultsService = homeStayResultsService;
    }

    @GetMapping
    public ResponseEntity<List<HomeStayResultsDTO>> getHomeStayResults(@RequestParam String location) {

        return ResponseEntity.ok(homeStayResultsService.getHomeStaysResult(location));

    }
    @GetMapping("/homeStayList")
    public ResponseEntity<List<ListHotelNamesDTO>> getHomeStayList() {
        return ResponseEntity.ok(homeStayResultsService.getListOfHomeStayNames());
    }

    @GetMapping("/homeStay")
    public ResponseEntity<Optional<HomeStay>> getHomeStay(@RequestParam Integer homeStayId) {
        return ResponseEntity.ok(homeStayResultsService.getHomeStay(homeStayId));
    }

}
