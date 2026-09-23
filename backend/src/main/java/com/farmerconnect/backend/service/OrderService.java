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
import com.farmerconnect.backend.exception.OrderNotFoundException;

import java.util.List;

import java.math.BigDecimal;
import com.farmerconnect.backend.dto.UpdateOrderStatusRequest;

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

    public List<OrderResponse> getFarmerOrders(User farmer) {

        return orderRepository.findByProductFarmerId(farmer.getId())
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    public OrderResponse getFarmerOrder(Long orderId, User farmer) {

        Order order = orderRepository
                .findByIdAndProductFarmerId(orderId, farmer.getId())
                .orElseThrow(() ->
                        new OrderNotFoundException("Order not found"));

        return convertToResponse(order);
    }

    @Transactional
    public OrderResponse updateFarmerOrderStatus(
            Long orderId,
            UpdateOrderStatusRequest request,
            User farmer) {

        Order order = orderRepository
                .findByIdAndProductFarmerId(orderId, farmer.getId())
                .orElseThrow(() ->
                        new OrderNotFoundException("Order not found"));

        OrderStatus currentStatus = order.getStatus();
        OrderStatus newStatus = request.getStatus();

        boolean validTransition =
                (currentStatus == OrderStatus.PENDING &&
                        (newStatus == OrderStatus.CONFIRMED ||
                                newStatus == OrderStatus.CANCELLED))
                        ||
                        (currentStatus == OrderStatus.CONFIRMED &&
                                newStatus == OrderStatus.PROCESSING)
                        ||
                        (currentStatus == OrderStatus.PROCESSING &&
                                newStatus == OrderStatus.SHIPPED)
                        ||
                        (currentStatus == OrderStatus.SHIPPED &&
                                newStatus == OrderStatus.DELIVERED);

        if (!validTransition) {
            throw new IllegalArgumentException(
                    "Invalid order status transition from "
                            + currentStatus + " to " + newStatus);
        }

        if (newStatus == OrderStatus.CANCELLED) {
            Product product = order.getProduct();

            product.setQuantity(
                    product.getQuantity() + order.getQuantity()
            );

            productRepository.save(product);
        }

        order.setStatus(newStatus);

        return convertToResponse(orderRepository.save(order));
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