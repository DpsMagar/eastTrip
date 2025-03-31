package com.eastTrip.backendSpringBoot.service;

import com.eastTrip.backendSpringBoot.dto.FlightSearchResultsDTO;
import com.eastTrip.backendSpringBoot.model.Airport;
import com.eastTrip.backendSpringBoot.model.AirportOpeningDay;
import com.eastTrip.backendSpringBoot.model.DayOfWeek;
import com.eastTrip.backendSpringBoot.model.FlightDetails;
import com.eastTrip.backendSpringBoot.repository.AirportOpeningDayRepository;
import com.eastTrip.backendSpringBoot.repository.AirportRepository;
import com.eastTrip.backendSpringBoot.repository.FlightDetailsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FlightSearchResultsService {

    private final AirportRepository airportRepository;
    private final FlightDetailsRepository flightDetailsRepository;
    private final AirportOpeningDayRepository airportOpeningDayRepository;

    public List<FlightSearchResultsDTO> getAllFlightInfo(String to, String from, String dayOfWeek) {

        List<Airport> fromAirports = airportRepository.findAllByCode(from);
        List<Airport> toAirports = airportRepository.findAllByCode(to);

        if (fromAirports.isEmpty() || toAirports.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid airport codes");
        }

        DayOfWeek dayOfWeekEnum;
        try {
            dayOfWeekEnum = DayOfWeek.valueOf(dayOfWeek.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid day of the week");
        }

        List<FlightSearchResultsDTO> flightSearchResultsDTOList = new ArrayList<>();

        for (Airport fromAirport : fromAirports) {
            for (Airport toAirport : toAirports) {

                List<FlightDetails> flightDetailsList = flightDetailsRepository.findByFromAirportAndToAirport(fromAirport, toAirport);

                for (FlightDetails flightDetails : flightDetailsList) {
                    List<AirportOpeningDay> availableFlights = flightsAvailableOnThatDay(fromAirport, dayOfWeekEnum);

                    if (!availableFlights.isEmpty()) {
                        FlightSearchResultsDTO dto = new FlightSearchResultsDTO();
                        dto.setToName(toAirport.getName());
                        dto.setFromName(fromAirport.getName());
                        dto.setToCode(to);
                        dto.setFromCode(from);
                        dto.setToCity(toAirport.getCity());
                        dto.setFromCity(fromAirport.getCity());
                        dto.setFlightDuration(flightDetails.getFlightDuration());
                        dto.setAvailableSeats(flightDetails.getAvailableSeats());
                        dto.setPrice(flightDetails.getPrice());

                        flightSearchResultsDTOList.add(dto);
                    }
                }
            }
        }
        return flightSearchResultsDTOList;
    }

    private List<AirportOpeningDay> flightsAvailableOnThatDay(Airport airport, DayOfWeek dayOfWeek) {
        return airportOpeningDayRepository.findByAirportAndDayOfWeek(airport, dayOfWeek);
    }
}
