package com.eastTrip.backendSpringBoot.service;

import com.eastTrip.backendSpringBoot.dto.HotelSearchResultsDTO;
import com.eastTrip.backendSpringBoot.model.Hotel;
import com.eastTrip.backendSpringBoot.repository.HotelRepository;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
public class HotelSearchResultsService {

    private final HotelRepository hotelRepository;

    public HotelSearchResultsService(HotelRepository hotelRepository) {
        this.hotelRepository = hotelRepository;
    }

    public Set<HotelSearchResultsDTO> getAllHotelSearchList(String cityName) {
        return hotelRepository.findByCity(cityName).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toSet());
    }

    private HotelSearchResultsDTO convertToDTO(Hotel hotel) {
        return new HotelSearchResultsDTO(
                hotel.getName(),
                hotel.getLocation(),
                hotel.getRating(),
                hotel.getPrice(),
                hotel.getNumberOfSeats(),
        );
    }
}
