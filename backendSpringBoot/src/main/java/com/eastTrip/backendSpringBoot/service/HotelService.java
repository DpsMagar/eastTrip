package com.eastTrip.backendSpringBoot.service;

import com.eastTrip.backendSpringBoot.dto.AddPropertyDTO;
import com.eastTrip.backendSpringBoot.model.Hotel;
import com.eastTrip.backendSpringBoot.model.HotelFeatures;
import com.eastTrip.backendSpringBoot.model.HotelRooms;
import com.eastTrip.backendSpringBoot.model.UserProperties;
import com.eastTrip.backendSpringBoot.model.UserProperties;
import com.eastTrip.backendSpringBoot.repository.HotelFeaturesRepository;
import com.eastTrip.backendSpringBoot.repository.HotelRepository;
import com.eastTrip.backendSpringBoot.repository.HotelRoomsRepository;
import com.eastTrip.backendSpringBoot.repository.UserPropertiesRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HotelService {

    private final HotelRepository hotelRepository;
    private final HotelFeaturesRepository hotelFeaturesRepository;
    private final HotelRoomsRepository hotelRoomsRepository;
    private final UserPropertiesRepository UserPropertiesRepository;

    public HotelService(HotelRepository hotelRepository,
                        HotelFeaturesRepository hotelFeaturesRepository,
                        HotelRoomsRepository hotelRoomsRepository, UserPropertiesService UserPropertiesService, UserPropertiesRepository UserPropertiesRepository) {
        this.hotelRepository = hotelRepository;
        this.hotelFeaturesRepository = hotelFeaturesRepository;
        this.hotelRoomsRepository = hotelRoomsRepository;
        this.UserPropertiesRepository = UserPropertiesRepository;
    }

    public Hotel addHotel(AddPropertyDTO dto) {

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

        hotel.setServices(features);
        hotel.setRoomFeatures(rooms);




        Hotel response= hotelRepository.save(hotel);

        UserProperties properties = new UserProperties();
        properties.setPropertyType(1);
        properties.setUserId(Long.valueOf(dto.getUserId()));
        properties.setPropertyId(Math.toIntExact(hotel.getId()));
//        properties.set;

        UserPropertiesRepository.save(properties);
        return response;

    }
}
