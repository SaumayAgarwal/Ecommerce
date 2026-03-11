package com.project.ecommerce.mapper;

import com.project.ecommerce.dto.*;
import com.project.ecommerce.model.*;

import java.util.List;
import java.util.stream.Collectors;

public class EntityMapper {

    public static ProductResponseDTO toProductDTO(Product product) {
        return new ProductResponseDTO(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getStock()
        );
    }

    public static UserResponseDTO toUserDTO(User user) {
        return new UserResponseDTO(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole().name(),
                user.getCreatedAt()
        );
    }

    public static OrderItemResponseDTO toOrderItemDTO(OrderItem item) {
        return new OrderItemResponseDTO(
                item.getId(),
                item.getProduct().getId(),
                item.getProduct().getName(),
                item.getPrice(),
                item.getQuantity()
        );
    }

    public static OrderResponseDTO toOrderDTO(Order order) {

        List<OrderItemResponseDTO> items =
                order.getOrderItems()
                        .stream()
                        .map(EntityMapper::toOrderItemDTO)
                        .collect(Collectors.toList());

        return new OrderResponseDTO(
                order.getId(),
                toUserDTO(order.getUser()),
                order.getTotalAmount(),
                order.getStatus().name(),
                order.getCreatedAt(),
                items
        );
    }
}