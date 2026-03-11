package com.project.ecommerce.service;

import com.project.ecommerce.exception.ResourceNotFoundException;
import com.project.ecommerce.model.Product;
import com.project.ecommerce.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    // ADMIN - Add Product
    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    // ADMIN - Update Product
    public Product updateProduct(Long id, Product updatedProduct) {

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        product.setName(updatedProduct.getName());
        product.setDescription(updatedProduct.getDescription());
        product.setPrice(updatedProduct.getPrice());
        product.setStock(updatedProduct.getStock());
        product.setImageUrl(updatedProduct.getImageUrl());
        product.setCategory(updatedProduct.getCategory());

        return productRepository.save(product);
    }

    // ADMIN - Delete Product
    public void deleteProduct(Long id) {

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        productRepository.delete(product);
    }

    // USER - Get All Products (with pagination & sorting)
    public Page<Product> getAllProducts(int page, int size, String sortBy) {

        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));

        return productRepository.findAll(pageable);
    }

    // USER - Search Products
    public Page<Product> searchProducts(String keyword, int page, int size) {

        Pageable pageable = PageRequest.of(page, size);

        return productRepository.findByNameContainingIgnoreCase(keyword, pageable);
    }

    // USER - Get Single Product
    public Product getProductById(Long id) {

        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
    }
}

