package com.eastTrip.backendSpringBoot.service;


import com.eastTrip.backendSpringBoot.dto.HomeStayResultsDTO;
import com.eastTrip.backendSpringBoot.dto.ListHotelNamesDTO;
import com.eastTrip.backendSpringBoot.model.HomeStay;
import com.eastTrip.backendSpringBoot.model.HomeStayRooms;
import com.eastTrip.backendSpringBoot.model.HomeStayFeatures;
import com.eastTrip.backendSpringBoot.repository.HomeStayRepository;
import com.eastTrip.backendSpringBoot.repository.HomeStayRoomsRepository;
import com.eastTrip.backendSpringBoot.repository.HomeStayServicesRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class HomeStayResultsService {
    private final HomeStayRepository homeStayRepository;
    private final HomeStayRoomsRepository homeStayRoomsRepository;
    private final HomeStayServicesRepository homeStayServicesRepository;

    public HomeStayResultsService(HomeStayRepository homeStayRepository, HomeStayRoomsRepository homeStayRoomsRepository, HomeStayServicesRepository homeStayServicesRepository) {
        this.homeStayRepository = homeStayRepository;
        this.homeStayRoomsRepository = homeStayRoomsRepository;
        this.homeStayServicesRepository = homeStayServicesRepository;
    }


    public List<HomeStayResultsDTO> getHomeStaysResult(String cityName) {

        List<HomeStay> homeStays = homeStayRepository.findAllByLocation(cityName);

        List<HomeStayResultsDTO> homeStayResultsDTOs = new ArrayList<HomeStayResultsDTO>();

        for (HomeStay homeStay : homeStays) {

            HomeStayResultsDTO homeStayResultsDTO = new HomeStayResultsDTO();
            homeStayResultsDTO.setHomeStayId(homeStay.getId());
            homeStayResultsDTO.setHomeStayName(homeStay.getName());
            homeStayResultsDTO.setHomeStayLocation(homeStay.getLocation());
            homeStayResultsDTO.setAttraction(homeStay.getAttraction());
            homeStayResultsDTO.setRating(Integer.parseInt(homeStay.getRating()));
            homeStayResultsDTO.setPrice(homeStay.getPrice());
            homeStayResultsDTO.setExtraInfo(homeStay.getExtraInfo());
            homeStayResultsDTO.setRoomFeatures(mapRoomFeatures(homeStay.getRoomFeatures()));
            homeStayResultsDTO.setHomeStayFeatures(mapHotelServices(homeStay.getServices()));
            homeStayResultsDTO.setImageUrl(homeStay.getImageUrl());

            homeStayResultsDTOs.add(homeStayResultsDTO);
        }
    return homeStayResultsDTOs;

    }

    private List<String> mapHotelServices(List<HomeStayFeatures> services) {
        return services.stream()
                .map(HomeStayFeatures::getServices)
                .collect(Collectors.toList());
    }

    private List<String> mapRoomFeatures(List<HomeStayRooms> roomFeatures) {
        return roomFeatures.stream()
                .map(HomeStayRooms::getRoomFeature)
                .collect(Collectors.toList());
    }
    public List<ListHotelNamesDTO> getListOfHomeStayNames() {
        List<HomeStay> homeStays = homeStayRepository.findAll();

        List<ListHotelNamesDTO> homeStayNames = new ArrayList<>();

        for (HomeStay homeStay : homeStays) {
            ListHotelNamesDTO homeStayNamesDTO = new ListHotelNamesDTO();
            homeStayNamesDTO.setHotelName(homeStay.getName());
            homeStayNamesDTO.setHotelCity(homeStay.getLocation());
            homeStayNames.add(homeStayNamesDTO);
        }
        return homeStayNames;
    }

    public Optional<HomeStay> getHomeStay(Integer homeStayId) {
        return homeStayRepository.findById(homeStayId);
    }
}
