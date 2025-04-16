package com.eastTrip.backendSpringBoot.service;

import com.eastTrip.backendSpringBoot.dto.AddHotelDTO;
import com.eastTrip.backendSpringBoot.model.Hotel;
import com.eastTrip.backendSpringBoot.model.HotelFeatures;
import com.eastTrip.backendSpringBoot.model.HotelRooms;
import com.eastTrip.backendSpringBoot.repository.HotelFeaturesRepository;
import com.eastTrip.backendSpringBoot.repository.HotelRepository;
import com.eastTrip.backendSpringBoot.repository.HotelRoomsRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HotelService {

    private final HotelRepository hotelRepository;
    private final HotelFeaturesRepository hotelFeaturesRepository;
    private final HotelRoomsRepository hotelRoomsRepository;

    public HotelService(HotelRepository hotelRepository,
                        HotelFeaturesRepository hotelFeaturesRepository,
                        HotelRoomsRepository hotelRoomsRepository) {
        this.hotelRepository = hotelRepository;
        this.hotelFeaturesRepository = hotelFeaturesRepository;
        this.hotelRoomsRepository = hotelRoomsRepository;
    }

    public Hotel addHotel(AddHotelDTO dto) {
        Hotel hotel = new Hotel();
        hotel.setName(dto.getName());
        hotel.setLocation(dto.getLocation());
        hotel.setAttraction(dto.getAttraction());
        hotel.setPrice(dto.getPrice());
        hotel.setRating(dto.getRating());
        hotel.setExtraInfo(dto.getExtraInfo());
        hotel.setImageUrl(dto.getImageUrl());

        List<HotelFeatures> features = hotelFeaturesRepository.findAllById(dto.getFeatureIds());
        List<HotelRooms> rooms = hotelRoomsRepository.findAllById(dto.getRoomFeatureIds());

        hotel.setFeaturesOfHotel(features);
        hotel.setRoomFeatures(rooms);

        return hotelRepository.save(hotel);
    }
}
