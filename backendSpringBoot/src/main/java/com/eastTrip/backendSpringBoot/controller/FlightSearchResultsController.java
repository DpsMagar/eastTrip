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

/**
 * Controller for handling flight search results and related endpoints.
 * Provides the ability to fetch flight details based on search criteria and retrieve a list of available airports.
 */
@RestController
@RequestMapping("/results/flight")
public class FlightSearchResultsController {

    private final FlightSearchResultsService flightSearchResultsService; // Service to handle flight search logic

    private AirportRepository airportRepository; // Repository for airports (unused in the current controller)

    /**
     * Constructor to inject the FlightSearchResultsService into the controller.
     */
    private FlightSearchResultsController(FlightSearchResultsService flightSearchResultsService) {
        this.flightSearchResultsService = flightSearchResultsService;
    }

    /**
     * Endpoint to get flight search results based on the destination code, departure code, and day of the week.
     *
     * @param toCode The destination airport code (IATA code).
     * @param fromCode The departure airport code (IATA code).
     * @param dayOfWeek The day of the week when the flight is scheduled.
     * @return A ResponseEntity containing a list of flight search results.
     */
    @GetMapping
    public ResponseEntity<List<FlightSearchResultsDTO>> getFlightSearchResults(@RequestParam String toCode,
                                                                               @RequestParam String fromCode,
                                                                               @RequestParam String dayOfWeek) {
        // Retrieve all flight information matching the search criteria and return it as a ResponseEntity
        return ResponseEntity.ok(flightSearchResultsService.getAllFlightInfo(toCode, fromCode ,dayOfWeek));
    }

    /**
     * Endpoint to retrieve a list of available airport names.
     *
     * @return A ResponseEntity containing a list of airport names.
     */
    @GetMapping("/flightsList")
    public ResponseEntity<List<ListAirportNamesDTO>> getFlightsList() {
        // Return the list of airport names from the service
        return ResponseEntity.ok(flightSearchResultsService.getFlightNamesList());
    }

}
