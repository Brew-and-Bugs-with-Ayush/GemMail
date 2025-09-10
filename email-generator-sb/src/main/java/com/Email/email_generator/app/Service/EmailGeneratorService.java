package com.Email.email_generator.app.Service;

import com.Email.email_generator.app.Model.EmailRequest;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriComponentsBuilder;

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

    public String generateEmailReply(EmailRequest emailRequest) {
        String prompt = buildPrompt(emailRequest);

        Map<String, Object> requestBody = Map.of(
                "contents", List.of(
                        Map.of("parts", List.of(
                                Map.of("text", prompt)
                        ))
                )
        );

        String uri = UriComponentsBuilder.fromUriString(geminiApiUrl)
                .queryParam("key", geminiApiKey)
                .toUriString();

        try {
            String response = webClient.post()
                    .uri(uri)
                    .header("Content-Type", "application/json")
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            return extractResponseContent(response);
        } catch (Exception e) {
            return "API call failed: " + e.getMessage();
        }
    }

    private String extractResponseContent(String response) {
        try {
            JsonNode rootNode = objectMapper.readTree(response);
            JsonNode candidates = rootNode.path("candidates");

            if (candidates.isMissingNode() || candidates.isEmpty()) {
                return "No valid response from model.";
            }

            JsonNode content = candidates.get(0).path("content").path("parts");
            if (content.isMissingNode() || !content.isArray() || content.isEmpty()) {
                return "Model response structure was unexpected.";
            }

            return content.get(0).path("text").asText("Could not extract response.");
        } catch (Exception e) {
            return "Error parsing response: " + e.getMessage();
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
