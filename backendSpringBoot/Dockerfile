# Build stage
FROM maven:3.9.6-eclipse-temurin AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src/ src/
RUN mvn package -DskipTests

# Runtime stage
FROM openjdk:21-jdk-slim AS runtime
WORKDIR /app

# Copy the JAR file from the build stage
COPY --from=build /app/target/*.jar app.jar

# Copy the entrypoint script
COPY entrypoint.sh /app/entrypoint.sh

# Give execute permission to the script
RUN chmod +x /app/entrypoint.sh

# Expose the application port
EXPOSE 8080

# Set the entrypoint to the script
ENTRYPOINT ["/app/entrypoint.sh"]
