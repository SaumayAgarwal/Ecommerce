package com.project.ecommerce.dto;


import java.math.BigDecimal;

public class OrderItemResponseDTO {

    private Long id;
    private Long productId;
    private String productName;
    private BigDecimal price;
    private Integer quantity;

    public OrderItemResponseDTO(Long id, Long productId,
                                String productName,
                                BigDecimal price,
                                Integer quantity) {
        this.id = id;
        this.productId = productId;
        this.productName = productName;
        this.price = price;
        this.quantity = quantity;
    }

    public Long getProductId() {
        return productId;
    }

    public Long getId() {
        return id;
    }

    public String getProductName() {
        return productName;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public Integer getQuantity() {
        return quantity;
    }

    // getters
}