package com.project.ecommerce.controller;


import com.project.ecommerce.model.CartItem;
import com.project.ecommerce.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    // Add to cart
    @PostMapping("/add")
    public CartItem addToCart(@RequestParam Long productId,
                              @RequestParam Integer quantity) {
        return cartService.addToCart(productId, quantity);
    }

    // View cart
    @GetMapping
    public List<CartItem> viewCart() {
        return cartService.getUserCart();
    }

    // Update quantity
    @PutMapping("/{id}")
    public CartItem updateQuantity(@PathVariable Long id,
                                   @RequestParam Integer quantity) {
        return cartService.updateQuantity(id, quantity);
    }

    // Remove item
    @DeleteMapping("/{id}")
    public String removeFromCart(@PathVariable Long id) {
        cartService.removeFromCart(id);
        return "Item removed from cart";
    }
}