package com.eastTrip.backendSpringBoot.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
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

    // PaymentController.java
    @PostMapping("/verify")
    public ResponseEntity<?> verifyPayment(@RequestBody Map<String, String> esewaResponse) {
        try {
            // 1. Verify Signature
            String signedFieldNames = esewaResponse.get("signed_field_names");
            String receivedSignature = esewaResponse.get("signature");

            // Build the signed data string
            List<String> fields = Arrays.asList(signedFieldNames.split(","));
            StringBuilder signedData = new StringBuilder();

            for (String field : fields) {
                String value = esewaResponse.get(field);
                if (value != null) {
                    signedData.append(field).append("=").append(value).append(",");
                }
            }

            // Remove trailing comma
            if (signedData.length() > 0) {
                signedData.setLength(signedData.length() - 1);
            }

            // Generate HMAC-SHA256 signature
            String generatedSignature = generateSignature(signedData.toString());

            if (!generatedSignature.equals(receivedSignature)) {
                return ResponseEntity.badRequest().body("Invalid signature");
            }

            // 2. Verify Transaction Status with eSewa API
            String statusUrl = "https://rc-epay.esewa.com.np/api/epay/transaction/status/";
            String productCode = esewaResponse.get("product_code");
            String transactionUUID = esewaResponse.get("transaction_uuid");
            String totalAmount = esewaResponse.get("total_amount").replace(",", ""); // Remove commas

            String apiUrl = String.format("%s?product_code=%s&total_amount=%s&transaction_uuid=%s",
                    statusUrl, productCode, totalAmount, transactionUUID);

            // Call eSewa's status API
            ResponseEntity<String> apiResponse = restTemplate.getForEntity(apiUrl, String.class);

            if (apiResponse.getStatusCode() != HttpStatus.OK) {
                return ResponseEntity.badRequest().body("Status API error");
            }

            // Parse response
            ObjectMapper mapper = new ObjectMapper();
            JsonNode responseJson = mapper.readTree(apiResponse.getBody());

            // Handle statuses
            String status = responseJson.get("status").asText();
            switch (status) {
                case "COMPLETE":
                    return ResponseEntity.ok("Payment successful");
                case "PENDING":
                    return ResponseEntity.ok("Payment pending");
                case "NOT_FOUND":
                    return ResponseEntity.badRequest().body("Transaction expired");
                default:
                    return ResponseEntity.badRequest().body("Payment failed: " + status);
            }

        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Verification error");
        }
    }

    private String generateSignature(String data) throws Exception {
        Mac sha256 = Mac.getInstance("HmacSHA256");
        // Correct: Use the String secretKey to create SecretKeySpec
        SecretKeySpec secretKeySpec = new SecretKeySpec(secretKey.getBytes(), "HmacSHA256");
        sha256.init(secretKeySpec);
        return Base64.getEncoder().encodeToString(sha256.doFinal(data.getBytes()));
    }
    }
