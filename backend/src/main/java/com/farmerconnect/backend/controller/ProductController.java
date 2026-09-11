package com.farmerconnect.backend.controller;

import com.farmerconnect.backend.dto.ProductResponse;
import com.farmerconnect.backend.entity.Product;
import com.farmerconnect.backend.entity.User;
import com.farmerconnect.backend.service.ProductService;
import com.farmerconnect.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/farmer/products")
public class ProductController {

    private final ProductService productService;
    private final UserService userService;

    public ProductController(ProductService productService,
                             UserService userService) {
        this.productService = productService;
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<ProductResponse> createProduct(
            @RequestBody Product product,
            Authentication authentication) {

        String email = authentication.getName();

        User farmer = userService.getUserByEmail(email);

        Product savedProduct =
                productService.createProduct(product, farmer);

        ProductResponse response = new ProductResponse(
                savedProduct.getId(),
                savedProduct.getProductName(),
                savedProduct.getCategory(),
                savedProduct.getPrice(),
                savedProduct.getQuantity(),
                savedProduct.getDescription(),
                savedProduct.getCreatedAt(),
                farmer.getId(),
                farmer.getName()
        );

        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<ProductResponse>> getMyProducts(
            Authentication authentication) {

        String email = authentication.getName();

        User farmer = userService.getUserByEmail(email);

        List<Product> products =
                productService.getProductsByFarmer(farmer);

        List<ProductResponse> response = products.stream()
                .map(product -> new ProductResponse(
                        product.getId(),
                        product.getProductName(),
                        product.getCategory(),
                        product.getPrice(),
                        product.getQuantity(),
                        product.getDescription(),
                        product.getCreatedAt(),
                        farmer.getId(),
                        farmer.getName()
                ))
                .toList();

        return ResponseEntity.ok(response);
    }
    @PutMapping("/{id}")
    public ResponseEntity<ProductResponse> updateProduct(
            @PathVariable Long id,
            @RequestBody Product updatedProduct,
            Authentication authentication) {

        String email = authentication.getName();

        User farmer = userService.getUserByEmail(email);

        Product updated =
                productService.updateProduct(id, updatedProduct, farmer);

        ProductResponse response = new ProductResponse(
                updated.getId(),
                updated.getProductName(),
                updated.getCategory(),
                updated.getPrice(),
                updated.getQuantity(),
                updated.getDescription(),
                updated.getCreatedAt(),
                farmer.getId(),
                farmer.getName()
        );

        return ResponseEntity.ok(response);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(
            @PathVariable Long id,
            Authentication authentication) {

        String email = authentication.getName();

        User farmer = userService.getUserByEmail(email);

        productService.deleteProduct(id, farmer);

        return ResponseEntity.ok("Product deleted successfully");
    }
}