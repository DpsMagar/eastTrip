package com.eastTrip.backendSpringBoot.service;

import com.eastTrip.backendSpringBoot.dto.HotelSearchResultsDTO;
import com.eastTrip.backendSpringBoot.dto.ListHotelNamesDTO;
import com.eastTrip.backendSpringBoot.model.*;
import com.eastTrip.backendSpringBoot.repository.HotelRepository;
import com.eastTrip.backendSpringBoot.repository.HotelReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HotelSearchResultsService {

    private final HotelRepository hotelRepository;
    private final HotelReviewRepository hotelReviewRepository;

    @Transactional
    public List<HotelSearchResultsDTO> getAllHotelSearchList(String location) {

        List<Hotel> hotels = hotelRepository.findAllByLocation(location);

        List<HotelSearchResultsDTO> hotelSearchResultsDTOList = new ArrayList<>();
        for (Hotel hotel : hotels) {
            HotelSearchResultsDTO dto = new HotelSearchResultsDTO();
            dto.setHotelId(hotel.getId());
            dto.setHotelName(hotel.getName());
            dto.setHotelLocation(hotel.getLocation());
            dto.setAttraction(hotel.getAttraction());
            dto.setRating(Integer.parseInt(hotel.getRating()));
            dto.setRoomFeatures(mapRoomFeatures(hotel.getRoomFeatures()));
            dto.setHotelFeatures(mapHotelFeatures(hotel.getServices()));
            dto.setPrice(hotel.getPrice());
            dto.setExtraInfo(hotel.getExtraInfo());
            dto.setImageUrl(hotel.getImageUrl());

            hotelSearchResultsDTOList.add(dto);
        }

        return hotelSearchResultsDTOList;
    }

    private List<String> mapRoomFeatures(List<HotelRooms> roomFeatures) {
        return roomFeatures.stream()
                .map(HotelRooms::getRoomFeatures)
                .collect(Collectors.toList());
    }

    private List<String> mapHotelFeatures(List<HotelFeatures> hotelFeatures) {
        return hotelFeatures.stream()
                .map(HotelFeatures::getServices)
                .collect(Collectors.toList());
    }

    public List<ListHotelNamesDTO> getListOfHomeNames() {
        List<Hotel> hotels = hotelRepository.findAll();

        List<ListHotelNamesDTO> hotelNames = new ArrayList<>();

        for (Hotel hotel : hotels) {
            ListHotelNamesDTO hotelNamesDTO = new ListHotelNamesDTO();
            hotelNamesDTO.setHotelName(hotel.getName());
            hotelNamesDTO.setHotelCity(hotel.getLocation());
            hotelNames.add(hotelNamesDTO);
        }
        return hotelNames;
    }

    public Optional<Hotel> getHotel(Integer hotelId) {
        return hotelRepository.findById(hotelId);
    }
}
