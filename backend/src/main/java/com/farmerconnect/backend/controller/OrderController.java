package com.farmerconnect.backend.controller;
import com.farmerconnect.backend.entity.Order;
import com.farmerconnect.backend.dto.PlaceOrderRequest;
import com.farmerconnect.backend.entity.User;
import com.farmerconnect.backend.service.OrderService;
import com.farmerconnect.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import com.farmerconnect.backend.dto.OrderResponse;

@RestController
@RequestMapping("/api/buyer/orders")
public class OrderController {

    private final OrderService orderService;
    private final UserService userService;

    public OrderController(OrderService orderService,
                           UserService userService) {
        this.orderService = orderService;
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<OrderResponse> placeOrder(
            @RequestBody PlaceOrderRequest request,
            Authentication authentication) {

        String email = authentication.getName();

        User buyer = userService.getUserByEmail(email);

        Order order = orderService.placeOrder(
                request.getProductId(),
                request.getQuantity(),
                buyer
        );

        OrderResponse response = orderService.convertToResponse(order);

        return ResponseEntity.ok(response);
    }
}