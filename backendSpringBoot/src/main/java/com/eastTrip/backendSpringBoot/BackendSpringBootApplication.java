package com.eastTrip.backendSpringBoot;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendSpringBootApplication {

	public static void main(String[] args) {
//		Dotenv dotenv = Dotenv.load();
//
//		System.setProperty("DB_URL", dotenv.get("DB_URL"));
//		System.setProperty("DB_USERNAME", dotenv.get("DB_USERNAME"));
//		System.setProperty("DB_PASSWORD", dotenv.get("DB_PASSWORD"));
//		System.setProperty("GOOGLE_CLIENT_ID", dotenv.get("GOOGLE_CLIENT_ID"));
//		System.setProperty(("GOOGLE_CLIENT_SECRET"), dotenv.get("GOOGLE_CLIENT_SECRET"));
		SpringApplication.run(BackendSpringBootApplication.class, args);
	}

}
