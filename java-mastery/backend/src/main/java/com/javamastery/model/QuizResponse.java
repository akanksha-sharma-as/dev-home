package com.javamastery.model;

import java.util.List;

public class QuizResponse {
    private List<MCQQuestion> questions;
    private String topic;

    public QuizResponse() {
    }

    public QuizResponse(String topic, List<MCQQuestion> questions) {
        this.topic = topic;
        this.questions = questions;
    }

    public QuizResponse(List<MCQQuestion> questions, String topic) {
        this.questions = questions;
        this.topic = topic;
    }

    public List<MCQQuestion> getQuestions() {
        return questions;
    }

    public void setQuestions(List<MCQQuestion> questions) {
        this.questions = questions;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }
}