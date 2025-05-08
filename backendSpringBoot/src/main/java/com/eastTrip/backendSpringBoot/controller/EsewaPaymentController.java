package com.eastTrip.backendSpringBoot.controller;

import com.eastTrip.backendSpringBoot.dto.PaymentRequestDTO;
//import lombok.Value;
//import org.hibernate
import org.springframework.beans.factory.annotation.Value;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
@RequestMapping("/api/payment")
public class EsewaPaymentController {

    @Value("${esewa.success.url}")
    private String successUrl;

    @Value("${esewa.failure.url}")
    private String failureUrl;

    @Value("${esewa.merchant.code}")
    private String merchantCode;

    @PostMapping("/initiate")
    public ResponseEntity<Map<String, String>> initiatePayment(@RequestBody PaymentRequestDTO request) {
        Map<String, String> payload = new HashMap<>();
        payload.put("tAmt", String.valueOf(request.getTotalAmount())); // Total amount
        payload.put("amt", String.valueOf(request.getAmount())); // Actual product/service amount
        payload.put("txAmt", String.valueOf(request.getTaxAmount())); // Tax amount
        payload.put("psc", String.valueOf(request.getServiceCharge())); // Service charge
        payload.put("pdc", String.valueOf(request.getDeliveryCharge())); // Delivery charge
        payload.put("scd", merchantCode); // Merchant code
        payload.put("pid", request.getProductId()); // Unique product id
        payload.put("su", successUrl + "?pid=" + request.getProductId()); // Success URL
        payload.put("fu", failureUrl); // Failure URL

        return ResponseEntity.ok(payload);
    }
}
