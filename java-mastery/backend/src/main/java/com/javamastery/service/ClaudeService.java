package com.javamastery.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.javamastery.model.MCQQuestion;
import com.javamastery.model.QuizRequest;
import com.javamastery.model.QuizResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class ClaudeService {

    private final WebClient webClient;

    @Value("${anthropic.api.key:}")
    private String apiKey;

    public ClaudeService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder
                .baseUrl("https://api.anthropic.com")
                .build();
    }

    public QuizResponse generateQuiz(QuizRequest request) {
        String topic = request.getTopic() == null || request.getTopic().isBlank() ? "Java" : request.getTopic();
        String difficulty = request.getDifficulty() == null || request.getDifficulty().isBlank() ? "easy" : request.getDifficulty();
        int count = request.getCount() <= 0 ? 5 : request.getCount();
        return generateQuiz(topic, difficulty, count);
    }

    public QuizResponse generateQuiz(String topic, String difficulty, int count) {
        if (apiKey == null || apiKey.isBlank()) {
            return new QuizResponse(topic, List.of());
        }

        String prompt = buildPrompt(topic, difficulty, count);
        Map<String, Object> requestBody = Map.of(
                "model", "claude-3-5-sonnet-20240620",
                "max_tokens", 4096,
                "messages", List.of(Map.of("role", "user", "content", prompt))
        );

        try {
            String response = webClient.post()
                    .uri("/v1/messages")
                    .header("x-api-key", apiKey)
                    .header("anthropic-version", "2023-06-01")
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            return parseResponse(response, topic);
        } catch (Exception e) {
            return new QuizResponse(topic, List.of());
        }
    }

    private String buildPrompt(String topic, String difficulty, int count) {
        return String.format(
                "Generate %d Java MCQ questions about %s with %s difficulty. " +
                        "Return ONLY a valid JSON array with NO additional text, markdown, or explanation. " +
                        "[ { \"question\": \"Question text here?\", \"options\": [\"Option A\", \"Option B\", \"Option C\", \"Option D\"], \"correctAnswer\": 0, \"explanation\": \"Brief explanation why the answer is correct.\" } ] " +
                        "Rules: - correctAnswer is 0-indexed (0 = A, 1 = B, 2 = C, 3 = D) " +
                        "- Questions should test understanding, not just definitions " +
                        "- Include tricky edge cases and code snippets where relevant " +
                        "- Difficulty: %s means %s " +
                        "- Topic: Java %s concepts",
                count,
                topic,
                difficulty,
                difficulty,
                difficulty,
                topic
        );
    }

    private QuizResponse parseResponse(String responseBody, String topic) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        JsonNode root = mapper.readTree(responseBody);
        JsonNode content = root.path("content");

        if (content.isMissingNode() || content.isEmpty()) {
            return new QuizResponse(List.of(), topic);
        }

        String text = content.get(0).path("text").asText();
        List<JsonNode> questions = mapper.readValue(text, new TypeReference<List<JsonNode>>() {});

        List<MCQQuestion> parsedQuestions = new ArrayList<>();
        for (JsonNode questionNode : questions) {
            List<String> options = new ArrayList<>();
            for (JsonNode optionNode : questionNode.path("options")) {
                options.add(optionNode.asText());
            }

            String questionText = questionNode.path("question").asText();
            String explanation = questionNode.path("explanation").asText();
            int correctAnswer = questionNode.path("correctAnswer").asInt(0);

            parsedQuestions.add(new MCQQuestion(
                    parsedQuestions.size(),
                    questionText,
                    options,
                    correctAnswer,
                    explanation
            ));
        }

        return new QuizResponse(parsedQuestions, topic);
    }
}
