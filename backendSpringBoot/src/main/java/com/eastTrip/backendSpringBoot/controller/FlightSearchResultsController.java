package com.eastTrip.backendSpringBoot.controller;

import com.eastTrip.backendSpringBoot.dto.FlightSearchResultsDTO;
import com.eastTrip.backendSpringBoot.model.DayOfWeek;
import com.eastTrip.backendSpringBoot.service.FlightSearchResultsService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/results/flight")
public class FlightSearchResultsController {

    private FlightSearchResultsService flightSearchResultsService;

    private FlightSearchResultsController(FlightSearchResultsService flightSearchResultsService) {
        this.flightSearchResultsService = flightSearchResultsService;
    }

    @GetMapping
    public ResponseEntity<List<FlightSearchResultsDTO>> getFlightSearchResults( @RequestParam("toCode") String to,
                                                                                @RequestParam("fromCode") String from,
                                                                                @RequestParam("Date") DayOfWeek date) {
        return ResponseEntity.ok(flightSearchResultsService.getAllFlightInfo(to, from, date));
    }
}
