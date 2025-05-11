package com.eastTrip.backendSpringBoot.service;

import com.eastTrip.backendSpringBoot.dto.HotelSearchResultsDTO;
import com.eastTrip.backendSpringBoot.model.*;
import com.eastTrip.backendSpringBoot.repository.HomeStayRepository;
import com.eastTrip.backendSpringBoot.repository.HotelRepository;
import com.eastTrip.backendSpringBoot.repository.UserPropertiesRepository;
import com.eastTrip.backendSpringBoot.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserPropertiesService {

    private final UserPropertiesRepository repository;
    private final HotelRepository hotelRepository;
    private final HomeStayRepository homeStayRepository;
    private final UserRepository userRepository;

    public UserPropertiesService(UserPropertiesRepository repository, HotelRepository hotelRepository, HomeStayRepository homeStayRepository, UserRepository userRepository) {
        this.repository = repository;
        this.hotelRepository = hotelRepository;
        this.homeStayRepository = homeStayRepository;
        this.userRepository = userRepository;
    }

    public List<UserProperties> getAll() {
        return repository.findAll();
    }

    public Optional<UserProperties> getById(Long id) {
        return repository.findById(id);
    }

    public List<HotelSearchResultsDTO> getByUserId(Integer userId) {
        List<UserProperties> UserPropertiesList = repository.findByUserId(userId);
        List<HotelSearchResultsDTO> result = new ArrayList<>();

        for (UserProperties prop : UserPropertiesList) {
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
                type,
                false

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
                        .collect(Collectors.toList()),
                homestay.getServices().stream()
                        .map(HomeStayFeatures::getServices)
                        .collect(Collectors.toList()),
                homestay.getPrice(),
                homestay.getExtraInfo(),
                homestay.getImageUrl(),
                type,
                false
        );
    }

    public UserProperties create(UserProperties property) {
        return repository.save(property);
    }

    public UserProperties update(Long id, UserProperties updated) {
        return repository.findById(id)
                .map(existing -> {
                    existing.setUserId(updated.getUserId());
                    existing.setPropertyId(updated.getPropertyId());
                    existing.setPropertyType(updated.getPropertyType());
                    existing.setListed(updated.isListed());
                    return repository.save(existing);
                }).orElseThrow(() -> new RuntimeException("Property not found"));
    }

    @Transactional
    public void delete(Integer id) {
        UserProperties deletableProperty= new UserProperties();
        Long propertyType = Long.valueOf(deletableProperty.getPropertyType());

        if(propertyType == 1) {
            hotelRepository.deleteById(Math.toIntExact(propertyType));
        }else {
            homeStayRepository.deleteById(Math.toIntExact(propertyType));
        }
        repository.deleteByPropertyId((id));
    }

    @Transactional
    public void deleteUser(Long userID) {
         repository.deleteByUserId(userID);
    }
}
