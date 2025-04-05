package com.eastTrip.backendSpringBoot.controller;

import com.eastTrip.backendSpringBoot.dto.HotelSearchResultsDTO;
import com.eastTrip.backendSpringBoot.dto.ListHotelNamesDTO;
import com.eastTrip.backendSpringBoot.service.HotelSearchResultsService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Set;


@RestController
@RequestMapping("/results/hotels")
public class HotelSearchResultsController {

    private final HotelSearchResultsService hotelSearchResultsService;

    public HotelSearchResultsController(HotelSearchResultsService hotelSearchResultsService) {
        this.hotelSearchResultsService = hotelSearchResultsService;
    }

    @GetMapping
    public ResponseEntity<List<HotelSearchResultsDTO>> getHotelSearchResults(@RequestParam String location) {
            return ResponseEntity.ok(hotelSearchResultsService.getAllHotelSearchList(location));
    }

    @GetMapping("/hotelList")
    public ResponseEntity<List<ListHotelNamesDTO>> getHomeStayList() {
        return ResponseEntity.ok(hotelSearchResultsService.getListOfHomeNames());
    }
}
