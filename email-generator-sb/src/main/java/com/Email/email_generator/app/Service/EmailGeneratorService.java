package com.Email.email_generator.app.Service;

import com.Email.email_generator.app.Model.EmailRequest;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class EmailGeneratorService {

    private final WebClient webClient;
    private final ObjectMapper objectMapper;

    @Value("${gemini.api.url}")
    private String geminiApiUrl;

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    public EmailGeneratorService(WebClient.Builder webClientBuilder, ObjectMapper objectMapper) {
        this.webClient = webClientBuilder.build();
        this.objectMapper = objectMapper;
    }

    @PostConstruct
    public void init() {
        System.out.println("API URL: " + geminiApiUrl);
        System.out.println("API Key: " + (geminiApiKey != null && geminiApiKey.length() > 10
                ? geminiApiKey.substring(0, 10) + "..."
                : "INVALID OR NULL"));
    }

    public String generateEmailReply(EmailRequest emailRequest) {
        System.out.println("\n========================================");
        System.out.println("GENERATING EMAIL REPLY");
        System.out.println("========================================");

        String prompt = buildPrompt(emailRequest);
        System.out.println("Prompt length: " + prompt.length() + " characters");

        // Build request body with explicit types
        Map<String, Object> part = new HashMap<>();
        part.put("text", prompt);

        Map<String, Object> content = new HashMap<>();
        content.put("parts", List.of(part));

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("contents", List.of(content));

        // Build full URL
        String fullUrl = geminiApiUrl + "?key=" + geminiApiKey;

        System.out.println("Full URL: " + geminiApiUrl + "?key=***");

        try {
            String jsonBody = objectMapper.writeValueAsString(requestBody);
            System.out.println("Request JSON: " + jsonBody);
            System.out.println("Making API call...");

            String response = webClient.post()
                    .uri(fullUrl)
                    .header("Content-Type", "application/json")
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            System.out.println("Response received!");
            System.out.println("Response preview: " + (response != null && response.length() > 100
                    ? response.substring(0, 100) + "..."
                    : response));
            System.out.println("========================================\n");

            return extractResponseContent(response);

        } catch (WebClientResponseException e) {
            System.err.println("========================================");
            System.err.println("API ERROR!");
            System.err.println("========================================");
            System.err.println("Status Code: " + e.getStatusCode());
            System.err.println("Status Text: " + e.getStatusText());
            System.err.println("Response Body: " + e.getResponseBodyAsString());
            System.err.println("========================================\n");

            return "API Error [" + e.getStatusCode() + "]: " + e.getResponseBodyAsString();

        } catch (Exception e) {
            System.err.println("========================================");
            System.err.println("UNEXPECTED ERROR!");
            System.err.println("========================================");
            e.printStackTrace();
            System.err.println("========================================\n");

            return "Unexpected error: " + e.getMessage();
        }
    }

    private String extractResponseContent(String response) {
        try {
            JsonNode rootNode = objectMapper.readTree(response);

            System.out.println("Parsing response...");
            System.out.println("Root node: " + rootNode.toPrettyString());

            JsonNode candidates = rootNode.path("candidates");

            if (candidates.isMissingNode() || candidates.isEmpty()) {
                return "No valid response from model. Full response: " + response;
            }

            JsonNode content = candidates.get(0).path("content").path("parts");
            if (content.isMissingNode() || !content.isArray() || content.isEmpty()) {
                return "Model response structure unexpected. Full response: " + response;
            }

            String extractedText = content.get(0).path("text").asText("Could not extract response.");
            System.out.println("Extracted text length: " + extractedText.length());

            return extractedText;

        } catch (Exception e) {
            System.err.println("Error parsing response: " + e.getMessage());
            e.printStackTrace();
            return "Error parsing response: " + e.getMessage() + ". Raw response: " + response;
        }
    }

    private String buildPrompt(EmailRequest emailRequest) {
        String toneInstruction = "";
        if (emailRequest.getTone() != null && !emailRequest.getTone().isEmpty()) {
            toneInstruction = String.format(
                    """
                    Use a **%s** tone when writing the reply:
                    - Formal → Polite, professional, structured.
                    - Casual → Friendly, approachable, natural.
                    - Concise → Short, clear, direct.
                    
                    """,
                    emailRequest.getTone()
            );
        }

        return String.format(
                """
                You are a professional email assistant.
                Your goal is to generate the most contextually accurate, clear, and polite reply.
                
                %s
                Constraints:
                - Do NOT create a subject line.
                - Do NOT invent sender/receiver names unless explicitly provided.
                - Always preserve the intent of the original email.
                - Reply in natural email style (greeting, body, closing).
                - Do NOT hallucinate facts.
                - If original email is vague, politely ask for clarification instead of assuming.
                
                Original email:
                ---
                %s
                """,
                toneInstruction,
                emailRequest.getEmailContent()
        );
    }
}