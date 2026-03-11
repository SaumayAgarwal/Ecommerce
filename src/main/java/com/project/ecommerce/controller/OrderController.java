package com.project.ecommerce.controller;

import com.project.ecommerce.dto.OrderResponseDTO;
import com.project.ecommerce.model.Order;
import com.project.ecommerce.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    // Place order
    @PostMapping
    public Order placeOrder() {
        return orderService.placeOrder();
    }

    // Get user orders
    @GetMapping
    public List<OrderResponseDTO> myOrders() {
        return orderService.getUserOrders();
    }

    // Get order by id
    @GetMapping("/{id}")
    public Order getOrderById(@PathVariable Long id) {
        return orderService.getOrderById(id);
    }
}