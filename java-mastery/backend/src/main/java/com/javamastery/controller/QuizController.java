package com.javamastery.controller;

import com.javamastery.model.QuizRequest;
import com.javamastery.model.QuizResponse;
import com.javamastery.service.ClaudeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class QuizController {

    private final ClaudeService claudeService;

    public QuizController(ClaudeService claudeService) {
        this.claudeService = claudeService;
    }

    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("OK");
    }

    @PostMapping("/generate")
    public ResponseEntity<QuizResponse> generateQuiz(@RequestBody QuizRequest request) {
        int count = Math.max(1, Math.min(request.getCount(), 20));
        QuizResponse response = claudeService.generateQuiz(
                request.getTopic(),
                request.getDifficulty(),
                count
        );
        return ResponseEntity.ok(response);
    }
}
