package com.project.ecommerce.service;

import com.project.ecommerce.model.*;
import com.project.ecommerce.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    // Helper: Get logged-in user
    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext()
                .getAuthentication().getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // Add to cart
    public CartItem addToCart(Long productId, Integer quantity) {

        User user = getCurrentUser();

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (product.getStock() < quantity) {
            throw new RuntimeException("Not enough stock available");
        }

        // If already in cart → update quantity
        CartItem cartItem = cartItemRepository
                .findByUserAndProduct(user, product)
                .orElse(null);

        if (cartItem != null) {
            cartItem.setQuantity(cartItem.getQuantity() + quantity);
        } else {
            cartItem = CartItem.builder()
                    .user(user)
                    .product(product)
                    .quantity(quantity)
                    .build();
        }

        return cartItemRepository.save(cartItem);
    }

    // View cart
    public List<CartItem> getUserCart() {
        User user = getCurrentUser();
        return cartItemRepository.findByUser(user);
    }

    // Update quantity
    public CartItem updateQuantity(Long cartItemId, Integer quantity) {

        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        if (cartItem.getProduct().getStock() < quantity) {
            throw new RuntimeException("Not enough stock available");
        }

        cartItem.setQuantity(quantity);
        return cartItemRepository.save(cartItem);
    }

    // Remove item
    public void removeFromCart(Long cartItemId) {
        cartItemRepository.deleteById(cartItemId);
    }

    // Clear cart (used later in order)
    public void clearCart() {
        User user = getCurrentUser();
        cartItemRepository.deleteByUser(user);
    }
}