package com.eastTrip.backendSpringBoot.service;

import com.eastTrip.backendSpringBoot.dto.AddPropertyDTO;
import com.eastTrip.backendSpringBoot.model.HomeStay;
import com.eastTrip.backendSpringBoot.model.HomeStayFeatures;
import com.eastTrip.backendSpringBoot.model.HomeStayRooms;
import com.eastTrip.backendSpringBoot.repository.HomeStayRepository;
import com.eastTrip.backendSpringBoot.repository.HomeStayRoomsRepository;
import com.eastTrip.backendSpringBoot.repository.HomeStayServicesRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HomeStayService {
    private final HomeStayRepository homeStayRepository;
    private final HomeStayRoomsRepository homeStayRoomsRepository;
    private final HomeStayServicesRepository homeStayServicesRepository;

    public HomeStayService(HomeStayRepository homeStayRepository, HomeStayRoomsRepository homeStayRoomsRepository, HomeStayServicesRepository homeStayServicesRepository) {
        this.homeStayRepository = homeStayRepository;
        this.homeStayRoomsRepository = homeStayRoomsRepository;
        this.homeStayServicesRepository = homeStayServicesRepository;
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

        return homeStayRepository.save(homeStay);
    }
}
