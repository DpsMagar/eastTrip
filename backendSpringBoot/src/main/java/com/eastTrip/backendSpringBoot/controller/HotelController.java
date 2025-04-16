package com.eastTrip.backendSpringBoot.controller;


import com.eastTrip.backendSpringBoot.dto.AddPropertyDTO;
import com.eastTrip.backendSpringBoot.model.Hotel;
import com.eastTrip.backendSpringBoot.service.HotelService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/add/hotel")
public class HotelController {

    private HotelService hotelService;

    public HotelController(HotelService hotelService) {
        this.hotelService = hotelService;
    }

    @PostMapping
    public ResponseEntity<Hotel> addHotel(@RequestBody AddPropertyDTO hotelDTO) {
        Hotel hotel = hotelService.addHotel(hotelDTO);
        return ResponseEntity.ok(hotel);
    }
}
