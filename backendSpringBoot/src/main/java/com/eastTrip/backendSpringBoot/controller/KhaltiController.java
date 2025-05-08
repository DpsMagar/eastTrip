package com.eastTrip.backendSpringBoot.controller;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/khalti")
@CrossOrigin(origins = "*")
public class KhaltiController {

    private final String khaltiSecretKey = "810a3dceb2974b989a7a23795c44ec16";

    @PostMapping("/verify")
    public ResponseEntity<String> verifyPayment(@RequestBody KhaltiPaymentInfo paymentInfo) {
        String url = "https://dev.khalti.com/api/v2/payment/verify/";

        Map<String, String> body = new HashMap<>();
        body.put("token", paymentInfo.getToken());
        body.put("amount", String.valueOf(paymentInfo.getAmount())); // in paisa

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Key " + khaltiSecretKey);

        HttpEntity<Map<String, String>> requestEntity = new HttpEntity<>(body, headers);
        RestTemplate restTemplate = new RestTemplate();

        try {
            ResponseEntity<String> response = restTemplate.postForEntity(url, requestEntity, String.class);
            return response;
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Verification failed: " + e.getMessage());
        }
    }

    public static class KhaltiPaymentInfo {
        private String token;
        private long amount;

        public String getToken() { return token; }
        public void setToken(String token) { this.token = token; }

        public long getAmount() { return amount; }
        public void setAmount(long amount) { this.amount = amount; }
    }
}
