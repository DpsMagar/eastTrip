package com.eastTrip.backendSpringBoot.service;

import com.eastTrip.backendSpringBoot.dto.AddPropertyDTO;
import com.eastTrip.backendSpringBoot.model.HomeStay;
import com.eastTrip.backendSpringBoot.model.HomeStayFeatures;
import com.eastTrip.backendSpringBoot.model.HomeStayRooms;
import com.eastTrip.backendSpringBoot.model.userProperties;
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
    private final UserPropertiesRepository userPropertiesRepository;


    public HomeStayService(HomeStayRepository homeStayRepository, HomeStayRoomsRepository homeStayRoomsRepository, HomeStayServicesRepository homeStayServicesRepository, UserPropertiesRepository userPropertiesRepository) {
        this.homeStayRepository = homeStayRepository;
        this.homeStayRoomsRepository = homeStayRoomsRepository;
        this.homeStayServicesRepository = homeStayServicesRepository;
        this.userPropertiesRepository = userPropertiesRepository;
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
        userProperties properties = new userProperties();
        properties.setPropertyType(2);
        properties.setUserId(addHomeStayDTO.getUserId());
        properties.setPropertyId(Math.toIntExact(homeStay.getId()));

        userPropertiesRepository.save(properties);
        return response;
    }
}
