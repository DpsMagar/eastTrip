package com.eastTrip.backendSpringBoot.service;

import com.eastTrip.backendSpringBoot.dto.HotelSearchResultsDTO;
import com.eastTrip.backendSpringBoot.model.Hotel;
import com.eastTrip.backendSpringBoot.model.HotelFeatures;
import com.eastTrip.backendSpringBoot.model.HotelRooms;
import com.eastTrip.backendSpringBoot.repository.HotelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HotelSearchResultsService {

    private final HotelRepository hotelRepository;

    public Set<HotelSearchResultsDTO> getAllHotelSearchList(String location) {

       Set<Hotel> hotels = hotelRepository.findAllByLocation(location);

        Set<HotelSearchResultsDTO> hotelSearchResultsDTOList = new HashSet<>();
        for (Hotel hotel : hotels) {
            HotelSearchResultsDTO dto = new HotelSearchResultsDTO();
            dto.setHotelName(hotel.getName());
            dto.setHotelLocation(hotel.getLocation());
            dto.setAttraction(hotel.getAttraction());
            dto.setRating(Integer.parseInt(hotel.getRating()));
            dto.setRoomFeatures(mapRoomFeatures(hotel.getRoomFeatures()));
            dto.setHotelFeatures(mapHotelFeatures(hotel.getFeaturesOfHotel()));
            dto.setPrice(hotel.getPrice());
            dto.setExtraInfo(hotel.getExtraInfo());

            hotelSearchResultsDTOList.add(dto);
        }

        return hotelSearchResultsDTOList;
    }

    private Set<String> mapRoomFeatures(Set<HotelRooms> roomFeatures) {
        return roomFeatures.stream()
                .map(HotelRooms::getRoomFeatures)
                .collect(Collectors.toSet());
    }

    private Set<String> mapHotelFeatures(Set<HotelFeatures> hotelFeatures) {
        return hotelFeatures.stream()
                .map(HotelFeatures::getHotelFeatures)
                .collect(Collectors.toSet());
    }
}
