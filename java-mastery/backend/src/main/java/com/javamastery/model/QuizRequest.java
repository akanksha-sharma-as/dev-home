package com.javamastery.model;

public class QuizRequest {
    private String topic;
    private String difficulty;
    private int count;

    public QuizRequest() {
    }

    public QuizRequest(String topic, String difficulty, int count) {
        this.topic = topic;
        this.difficulty = difficulty;
        this.count = count;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }
}
