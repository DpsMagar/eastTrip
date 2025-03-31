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

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FlightSearchResultsService {

    private AirportRepository airportRepository;
    private FlightDetailsRepository flightDetailsRepository;
    private AirportOpeningDayRepository airportOpeningDayRepository;

    public FlightSearchResultsService(AirportRepository airportRepository, FlightDetailsRepository flightDetailsRepository, AirportOpeningDayRepository airportOpeningDayRepository) {
        this.airportRepository = airportRepository;
        this.flightDetailsRepository = flightDetailsRepository;
        this.airportOpeningDayRepository = airportOpeningDayRepository;
    }

    public List<FlightSearchResultsDTO> getAllFlightInfo(String to, String from, String dayOfWeek) {

        Airport fromAirport = airportRepository.findByCode(from);
        Airport toAirport = airportRepository.findByCode(to);
        DayOfWeek dayOfWeekEnum = DayOfWeek.valueOf(dayOfWeek);

        if (fromAirport == null || toAirport == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid airport codes");
        }

        List<FlightDetails> flightDetailsList = flightDetailsRepository.findByFromAirportAndToAirport(fromAirport, toAirport);

        List<FlightSearchResultsDTO> flightSearchResultsDTOList = new ArrayList<>();

        for (FlightDetails flightDetails : flightDetailsList) {
<<<<<<< HEAD
            List<AirportOpeningDay> flights = flightsAvailableOnThatDay(fromAirport, dayOfWeekEnum);
=======
//            boolean isFlightAvailable = checkIfFlightAvailableOnDay(fromAirport, dayOfWeek);
>>>>>>> 4dc8bce213b513f2e60f3e328c863a19c175704b

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
        return flightSearchResultsDTOList;
    }

<<<<<<< HEAD
        private List<AirportOpeningDay> flightsAvailableOnThatDay(Airport airport, DayOfWeek dayOfWeek){

            return airportOpeningDayRepository.findByAirportAndDayOfWeek(airport, dayOfWeek);
        }
=======
//        private boolean checkIfFlightAvailableOnDay(Airport airport, DayOfWeek dayOfWeek){
//
//            AirportOpeningDay openingDay= airportOpeningDayRepository.findByAirportAndDayOfWeek(airport, dayOfWeek);
//            return openingDay != null ;
//        }
>>>>>>> 4dc8bce213b513f2e60f3e328c863a19c175704b



}
