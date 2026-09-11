package com.farmerconnect.backend.service;

import com.farmerconnect.backend.entity.Product;
import com.farmerconnect.backend.entity.User;
import com.farmerconnect.backend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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