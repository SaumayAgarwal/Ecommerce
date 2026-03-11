package com.project.ecommerce.dto;


import java.time.LocalDateTime;

public class ErrorResponseDTO {

    private LocalDateTime timestamp;
    private int status;
    private String error;

    public void ErrorResponse(int status, String error) {
        this.timestamp = LocalDateTime.now();
        this.status = status;
        this.error = error;
    }

    // getters

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public int getStatus() {
        return status;
    }

    public String getError() {
        return error;
    }
}