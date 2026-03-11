package com.project.ecommerce.dto;


import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class OrderResponseDTO {

    private Long id;
    private UserResponseDTO user;
    private BigDecimal totalAmount;
    private String shippingAddress;
    private String status;
    private LocalDateTime createdAt;
    private List<OrderItemResponseDTO> orderItems;

    public OrderResponseDTO(Long id,
                            UserResponseDTO user,
                            BigDecimal totalAmount,
                            String shippingAddress,
                            String status,
                            LocalDateTime createdAt,
                            List<OrderItemResponseDTO> orderItems) {
        this.id = id;
        this.user = user;
        this.totalAmount = totalAmount;
        this.shippingAddress = shippingAddress;
        this.status = status;
        this.createdAt = createdAt;
        this.orderItems = orderItems;
    }

    // getters

    public Long getId() {
        return id;
    }

    public UserResponseDTO getUser() {
        return user;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public String getShippingAddress() {
        return shippingAddress;
    }

    public String getStatus() {
        return status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public List<OrderItemResponseDTO> getOrderItems() {
        return orderItems;
    }
}