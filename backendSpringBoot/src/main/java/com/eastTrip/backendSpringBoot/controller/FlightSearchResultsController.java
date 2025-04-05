package com.eastTrip.backendSpringBoot.controller;

import com.eastTrip.backendSpringBoot.dto.FlightSearchRequestDTO;
import com.eastTrip.backendSpringBoot.dto.FlightSearchResultsDTO;
import com.eastTrip.backendSpringBoot.dto.ListAirportNamesDTO;
import com.eastTrip.backendSpringBoot.model.Airport;
import com.eastTrip.backendSpringBoot.model.DayOfWeek;
import com.eastTrip.backendSpringBoot.repository.AirportRepository;
import com.eastTrip.backendSpringBoot.service.FlightSearchResultsService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/results/flight")
public class FlightSearchResultsController {

    private final FlightSearchResultsService flightSearchResultsService;

    private AirportRepository airportRepository;

    private FlightSearchResultsController(FlightSearchResultsService flightSearchResultsService) {
        this.flightSearchResultsService = flightSearchResultsService;


    }

    @GetMapping
    public ResponseEntity<List<FlightSearchResultsDTO>> getFlightSearchResults(@RequestParam String toCode,
                                                                               @RequestParam String fromCode,
                                                                               @RequestParam String dayOfWeek) {
//        LocalDate flightDate = LocalDate.parse(flightSearchRequestDTO.getDayOfWeek(), DateTimeFormatter.ofPattern("MM-dd-yyyy"));

        return ResponseEntity.ok(flightSearchResultsService.getAllFlightInfo(toCode, fromCode ,dayOfWeek));
    }

    @GetMapping("/flightsList")
    public ResponseEntity<List<ListAirportNamesDTO>> getFlightsList() {
        return ResponseEntity.ok(flightSearchResultsService.getFlightNamesList());
    }
}
