package com.eastTrip.backendSpringBoot.service;


import com.eastTrip.backendSpringBoot.dto.HomeStayResultsDTO;
import com.eastTrip.backendSpringBoot.repository.HomeStayRepository;
import com.eastTrip.backendSpringBoot.repository.HomeStayRoomsRepository;
import com.eastTrip.backendSpringBoot.repository.HomeStayServicesRepository;
import org.springframework.stereotype.Service;

import java.util.List;

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



    }
}
