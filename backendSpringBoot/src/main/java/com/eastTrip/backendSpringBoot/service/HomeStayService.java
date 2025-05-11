package com.eastTrip.backendSpringBoot.service;

import com.eastTrip.backendSpringBoot.dto.AddPropertyDTO;
import com.eastTrip.backendSpringBoot.model.HomeStay;
import com.eastTrip.backendSpringBoot.model.HomeStayFeatures;
import com.eastTrip.backendSpringBoot.model.HomeStayRooms;
import com.eastTrip.backendSpringBoot.model.UserProperties;
import com.eastTrip.backendSpringBoot.model.UserProperties;
import com.eastTrip.backendSpringBoot.repository.HomeStayRepository;
import com.eastTrip.backendSpringBoot.repository.HomeStayRoomsRepository;
import com.eastTrip.backendSpringBoot.repository.HomeStayServicesRepository;
import com.eastTrip.backendSpringBoot.repository.UserPropertiesRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HomeStayService {
    private final HomeStayRepository homeStayRepository;
    private final HomeStayRoomsRepository homeStayRoomsRepository;
    private final HomeStayServicesRepository homeStayServicesRepository;
    private final UserPropertiesRepository UserPropertiesRepository;


    public HomeStayService(HomeStayRepository homeStayRepository, HomeStayRoomsRepository homeStayRoomsRepository, HomeStayServicesRepository homeStayServicesRepository, UserPropertiesRepository UserPropertiesRepository) {
        this.homeStayRepository = homeStayRepository;
        this.homeStayRoomsRepository = homeStayRoomsRepository;
        this.homeStayServicesRepository = homeStayServicesRepository;
        this.UserPropertiesRepository = UserPropertiesRepository;
    }

    public HomeStay addHomeStay(AddPropertyDTO addHomeStayDTO) {
        HomeStay homeStay = new HomeStay();
        homeStay.setName(addHomeStayDTO.getName());
        homeStay.setLocation(addHomeStayDTO.getLocation());
        homeStay.setPrice(addHomeStayDTO.getPrice());
        homeStay.setAttraction(addHomeStayDTO.getAttraction());
        homeStay.setRating(addHomeStayDTO.getRating());
        homeStay.setExtraInfo(addHomeStayDTO.getExtraInfo());
        homeStay.setImageUrl(addHomeStayDTO.getImageUrl());

        List<HomeStayFeatures> features = homeStayServicesRepository.findAllById(addHomeStayDTO.getFeatureIds());
        List<HomeStayRooms> rooms = homeStayRoomsRepository.findAllById(addHomeStayDTO.getRoomFeatureIds());

        homeStay.setRoomFeatures(rooms);
        homeStay.setServices(features);

        HomeStay response= homeStayRepository.save(homeStay);
        UserProperties properties = new UserProperties();
        properties.setPropertyType(2);
        properties.setUserId(Long.valueOf(addHomeStayDTO.getUserId()));
        properties.setPropertyId(Math.toIntExact(homeStay.getId()));

        UserPropertiesRepository.save(properties);
        return response;
    }
}
