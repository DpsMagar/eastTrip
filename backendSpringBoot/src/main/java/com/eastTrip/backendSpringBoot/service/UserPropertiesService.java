package com.eastTrip.backendSpringBoot.service;

import com.eastTrip.backendSpringBoot.dto.HotelSearchResultsDTO;
import com.eastTrip.backendSpringBoot.model.*;
import com.eastTrip.backendSpringBoot.repository.HomeStayRepository;
import com.eastTrip.backendSpringBoot.repository.HotelRepository;
import com.eastTrip.backendSpringBoot.repository.UserPropertiesRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserPropertiesService {

    private final UserPropertiesRepository repository;
    private final HotelRepository hotelRepository;
    private final HomeStayRepository homeStayRepository;

    public UserPropertiesService(UserPropertiesRepository repository, HotelRepository hotelRepository, HomeStayRepository homeStayRepository) {
        this.repository = repository;
        this.hotelRepository = hotelRepository;
        this.homeStayRepository = homeStayRepository;
    }

    public List<userProperties> getAll() {
        return repository.findAll();
    }

    public Optional<userProperties> getById(Long id) {
        return repository.findById(id);
    }

    public List<HotelSearchResultsDTO> getByUserId(Integer userId) {
        List<userProperties> userPropertiesList = repository.findByUserId(userId);
        List<HotelSearchResultsDTO> result = new ArrayList<>();

        for (userProperties prop : userPropertiesList) {
            int type = prop.getPropertyType();
            Long propertyId = Long.valueOf(prop.getPropertyId());

            if (type == 1) { // Hotel
                hotelRepository.findById(propertyId).ifPresent(hotel -> {
                    result.add(mapHotelToDTO(hotel,type));
                });
            } else if (type == 2) { // Homestay
                homeStayRepository.findById(Math.toIntExact(propertyId)).ifPresent(homestay -> {
                    result.add(mapHomestayToDTO(homestay, type));
                });
            }
        }

        return result;
    }

    private HotelSearchResultsDTO mapHotelToDTO(Hotel hotel, int type) {
        return new HotelSearchResultsDTO(
                Long.valueOf(hotel.getId()),
                hotel.getName(),
                hotel.getLocation(),
                hotel.getAttraction(),
                Integer.parseInt(hotel.getRating()),
                hotel.getRoomFeatures()
                        .stream()
                            .map(HotelRooms::getRoomFeatures) // or getFeature() or similar
                        .collect(Collectors.toList())
                , // assuming List<String>
                hotel.getServices()
                        .stream().map(HotelFeatures::getServices)
                        .collect(Collectors.toList()),// assuming List<String>
                hotel.getPrice(),
                hotel.getExtraInfo(),
                hotel.getImageUrl(),
                type

        );
    }

    private HotelSearchResultsDTO mapHomestayToDTO(HomeStay homestay, int type) {
        return new HotelSearchResultsDTO(
                Long.valueOf(homestay.getId()),
                homestay.getName(),
                homestay.getLocation(),
                homestay.getAttraction(),
                Integer.parseInt(homestay.getRating()),
                homestay.getRoomFeatures().stream()
                        .map(HomeStayRooms::getRoomFeature)
                        .collect(Collectors.toList()), // assuming List<String>
                homestay.getServices().stream()
                        .map(HomeStayFeatures::getServices)
                        .collect(Collectors.toList()), // assuming List<String>
                homestay.getPrice(),
                homestay.getExtraInfo(),
                homestay.getImageUrl(),
                type
        );
    }

    public userProperties create(userProperties property) {
        return repository.save(property);
    }

    public userProperties update(Long id, userProperties updated) {
        return repository.findById(id)
                .map(existing -> {
                    existing.setUserId(updated.getUserId());
                    existing.setPropertyId(updated.getPropertyId());
                    existing.setPropertyType(updated.getPropertyType());
                    existing.setListed(updated.isListed());
                    return repository.save(existing);
                }).orElseThrow(() -> new RuntimeException("Property not found"));
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

}
