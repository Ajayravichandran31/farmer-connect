package com.farmerconnect.backend.service;

import com.farmerconnect.backend.entity.Product;
import com.farmerconnect.backend.entity.User;
import com.farmerconnect.backend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.farmerconnect.backend.dto.ProductResponse;
import com.farmerconnect.backend.exception.ProductNotFoundException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public Product createProduct(Product product, User farmer) {

        product.setFarmer(farmer);

        return productRepository.save(product);
    }

    public List<Product> getProductsByFarmer(User farmer) {

        return productRepository.findByFarmerId(farmer.getId());
    }
    public List<ProductResponse> getAllProducts() {

        List<Product> products = productRepository.findAll();

        return products.stream()
                .map(product -> new ProductResponse(
                        product.getId(),
                        product.getProductName(),
                        product.getCategory(),
                        product.getPrice(),
                        product.getQuantity(),
                        product.getDescription(),
                        product.getCreatedAt(),
                        product.getFarmer().getId(),
                        product.getFarmer().getName()
                ))
                .toList();
    }

    public ProductResponse getProductById(Long productId) {

    Product product = productRepository.findById(productId)
            .orElseThrow(() -> new ProductNotFoundException("Product not found"));

    return new ProductResponse(
            product.getId(),
            product.getProductName(),
            product.getCategory(),
            product.getPrice(),
            product.getQuantity(),
            product.getDescription(),
            product.getCreatedAt(),
            product.getFarmer().getId(),
            product.getFarmer().getName()
    );
}

    public Product updateProduct(Long productId, Product updatedProduct, User farmer) {

        Product existingProduct = productRepository
                .findByIdAndFarmerId(productId, farmer.getId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        existingProduct.setProductName(updatedProduct.getProductName());
        existingProduct.setCategory(updatedProduct.getCategory());
        existingProduct.setPrice(updatedProduct.getPrice());
        existingProduct.setQuantity(updatedProduct.getQuantity());
        existingProduct.setDescription(updatedProduct.getDescription());

        return productRepository.save(existingProduct);
    }
    public void deleteProduct(Long productId, User farmer) {

        Product existingProduct = productRepository
                .findByIdAndFarmerId(productId, farmer.getId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        productRepository.delete(existingProduct);
    }
}