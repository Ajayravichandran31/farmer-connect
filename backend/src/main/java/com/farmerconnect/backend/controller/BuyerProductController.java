package com.farmerconnect.backend.controller;

import com.farmerconnect.backend.dto.ProductResponse;
import com.farmerconnect.backend.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/buyer/products")
public class BuyerProductController {

    private final ProductService productService;

    public BuyerProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<List<ProductResponse>> getAllProducts() {

        List<ProductResponse> products =
                productService.getAllProducts();

        return ResponseEntity.ok(products);
    }

    @GetMapping("/{id}")
public ResponseEntity<ProductResponse> getProductById(
        @PathVariable Long id) {

    ProductResponse product = productService.getProductById(id);

    return ResponseEntity.ok(product);
}
}