package com.eastTrip.backendSpringBoot.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.util.*;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Value("${esewa.merchant.code}")
    private String merchantCode;

    @Value("${esewa.secret.key}")
    private String secretKey;

    @Value("${esewa.success.url}")
    private String successUrl;

    @Value("${esewa.failure.url}")
    private String failureUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    @PostMapping("/prepare")
    public ResponseEntity<Map<String, String>> preparePayment(@RequestBody Map<String, String> request) {
        try {
            String amount = request.get("amount");
            String taxAmount = request.get("taxAmount");
            double serviceCharge = 0.0;
            double deliveryCharge = 0.0;

            double totalAmount = Double.parseDouble(amount) + Double.parseDouble(taxAmount) + serviceCharge + deliveryCharge;
            String transactionUUID = UUID.randomUUID().toString();

            String signedData = String.format("total_amount=%.2f,transaction_uuid=%s,product_code=%s",
                    totalAmount, transactionUUID, merchantCode);

            String signature = generateSignature(signedData);

            Map<String, String> response = new HashMap<>();
            response.put("amount", amount);
            response.put("tax_amount", taxAmount);
            response.put("total_amount", String.format("%.2f", totalAmount));
            response.put("transaction_uuid", transactionUUID);
            response.put("product_code", merchantCode);
            response.put("product_service_charge", String.format("%.2f", serviceCharge));
            response.put("product_delivery_charge", String.format("%.2f", deliveryCharge));
            response.put("success_url", successUrl);
            response.put("failure_url", failureUrl);
            response.put("signed_field_names", "total_amount,transaction_uuid,product_code");
            response.put("signature", signature);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "Payment preparation failed"));
        }
    }

    @PostMapping("/verify")
    public ResponseEntity<String> verifyPayment(@RequestBody Map<String, String> params) {
        try {
            String totalAmount = params.get("total_amount");
            String transactionUUID = params.get("transaction_uuid");
            String productCode = params.get("product_code");
            String receivedSignature = params.get("signature");

            String signedData = String.format("total_amount=%s,transaction_uuid=%s,product_code=%s",
                    totalAmount, transactionUUID, productCode);

            String generatedSignature = generateSignature(signedData);

            if (!generatedSignature.equals(receivedSignature)) {
                return ResponseEntity.badRequest().body("Invalid signature");
            }

            // Verify transaction with eSewa
            String verificationUrl = "https://rc-epay.esewa.com.np/api/epay/transrec/v2";
            Map<String, String> verificationParams = new HashMap<>();
            verificationParams.put("total_amount", totalAmount);
            verificationParams.put("transaction_uuid", transactionUUID);
            verificationParams.put("product_code", productCode);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<Map<String, String>> entity = new HttpEntity<>(verificationParams, headers);

            ResponseEntity<String> verificationResponse = restTemplate.postForEntity(verificationUrl, entity, String.class);

            if (verificationResponse.getStatusCode() == HttpStatus.OK && verificationResponse.getBody().contains("Success")) {
                return ResponseEntity.ok("Payment successful and verified");
            } else {
                return ResponseEntity.badRequest().body("Payment verification failed");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Verification error");
        }
    }

    private String generateSignature(String data) throws Exception {
        Mac sha256 = Mac.getInstance("HmacSHA256");
        sha256.init(new SecretKeySpec(secretKey.getBytes(), "HmacSHA256"));
        return Base64.getEncoder().encodeToString(sha256.doFinal(data.getBytes()));
    }
}
