package com.eastTrip.backendSpringBoot.controller;

import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/esewa")
@CrossOrigin(origins = "*")
public class PaymentController {

    @PostMapping("/success")
    public ResponseEntity<String> handleSuccess(@RequestParam String amt,
                                                @RequestParam String pid,
                                                @RequestParam String rid) {
        String verifyUrl = "https://rc-epay.esewa.com.np/api/epay/verify";
        System.out.println("-----------------------------");

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> requestMap = new LinkedMultiValueMap<>();
        requestMap.add("amt", amt);
        requestMap.add("rid", rid);
        requestMap.add("pid", pid);
        requestMap.add("scd", "EPAYTEST");

        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(requestMap, headers);
        ResponseEntity<String> response = restTemplate.postForEntity(verifyUrl, requestEntity, String.class);

        return ResponseEntity.ok("Verification response from eSewa: " + response.getBody());
    }

    @PostMapping("/failure")
    public ResponseEntity<String> handleFailure() {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Payment Failed");
    }
}
