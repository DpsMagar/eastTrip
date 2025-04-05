#!/bin/bash

# Generate the application.properties dynamically at runtime
echo "spring.datasource.url=${DB_URL}" > /app/application.properties
echo "spring.datasource.username=${DB_USERNAME}" >> /app/application.properties
echo "spring.datasource.password=${DB_PASSWORD}" >> /app/application.properties
echo "spring.security.oauth2.client.registration.google.client-id=${GOOGLE_CLIENT_ID}" >> /app/application.properties
echo "spring.security.oauth2.client.registration.google.client-secret=${GOOGLE_CLIENT_SECRET}" >> /app/application.properties
# Add other properties as necessary

# Now start the Spring Boot application
exec java -jar /app/app.jar
