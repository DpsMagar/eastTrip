package com.eastTrip.backendSpringBoot.controller;

import com.eastTrip.backendSpringBoot.dto.AddPropertyDTO;
import com.eastTrip.backendSpringBoot.model.HomeStay;
import com.eastTrip.backendSpringBoot.service.HomeStayService;
import jakarta.persistence.Column;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/add/homestay")
public class AddHomeStayController {
    private HomeStayService homeStayService;

    public AddHomeStayController(HomeStayService homeStayService) {
        this.homeStayService = homeStayService;
    }

    @PostMapping
    public ResponseEntity<HomeStay> addHomeStay(@RequestBody AddPropertyDTO addHomeStayDTO) {
        return ResponseEntity.ok(homeStayService.addHomeStay(addHomeStayDTO));
    }


}
