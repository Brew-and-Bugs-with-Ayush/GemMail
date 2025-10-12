# Use official OpenJDK 21 image as base
FROM eclipse-temurin:21-jdk-alpine

# Set working directory
WORKDIR /app

# Copy jar
COPY target/email-generator-sb-0.0.1-SNAPSHOT.jar app.jar

# Expose Spring Boot port
EXPOSE 8080

# Run the jar
ENTRYPOINT ["sh", "-c", "java -jar /app/app.jar"]
