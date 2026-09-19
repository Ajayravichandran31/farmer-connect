package com.farmerconnect.backend.service;

import com.farmerconnect.backend.entity.Order;
import com.farmerconnect.backend.entity.OrderStatus;
import com.farmerconnect.backend.entity.Product;
import com.farmerconnect.backend.entity.User;
import com.farmerconnect.backend.exception.ProductNotFoundException;
import com.farmerconnect.backend.repository.OrderRepository;
import com.farmerconnect.backend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.farmerconnect.backend.dto.OrderResponse;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    @Transactional
    public Order placeOrder(Long productId, Integer quantity, User buyer) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException("Product not found"));

        if (quantity == null || quantity <= 0) {
            throw new IllegalArgumentException("Quantity must be greater than zero");
        }

        if (quantity > product.getQuantity()) {
            throw new IllegalArgumentException("Insufficient product quantity");
        }
        product.setQuantity(product.getQuantity() - quantity);
        productRepository.save(product);

        BigDecimal totalPrice = product.getPrice()
                .multiply(BigDecimal.valueOf(quantity));

        Order order = new Order();
        order.setBuyer(buyer);
        order.setProduct(product);
        order.setQuantity(quantity);
        order.setTotalPrice(totalPrice);
        order.setStatus(OrderStatus.PENDING);

        return orderRepository.save(order);
    }

    public OrderResponse convertToResponse(Order order) {

        OrderResponse response = new OrderResponse();

        response.setId(order.getId());

        response.setProductId(order.getProduct().getId());
        response.setProductName(order.getProduct().getProductName());

        response.setQuantity(order.getQuantity());
        response.setTotalPrice(order.getTotalPrice());

        response.setStatus(order.getStatus());
        response.setCreatedAt(order.getCreatedAt());

        response.setBuyerId(order.getBuyer().getId());
        response.setBuyerName(order.getBuyer().getName());
        response.setBuyerEmail(order.getBuyer().getEmail());

        response.setFarmerId(order.getProduct().getFarmer().getId());
        response.setFarmerName(order.getProduct().getFarmer().getName());

        return response;
    }
}