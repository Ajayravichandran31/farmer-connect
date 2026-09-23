package com.farmerconnect.backend.controller;

import com.farmerconnect.backend.dto.OrderResponse;
import com.farmerconnect.backend.entity.User;
import com.farmerconnect.backend.service.OrderService;
import com.farmerconnect.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import com.farmerconnect.backend.dto.UpdateOrderStatusRequest;

@RestController
@RequestMapping("/api/farmer/orders")
@RequiredArgsConstructor
public class FarmerOrderController {

    private final OrderService orderService;
    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<OrderResponse>> getFarmerOrders(
            Authentication authentication) {

        String email = authentication.getName();

        User farmer = userService.getUserByEmail(email);

        return ResponseEntity.ok(
                orderService.getFarmerOrders(farmer)
        );
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<OrderResponse> updateOrderStatus(
            @PathVariable Long id,
            @RequestBody UpdateOrderStatusRequest request,
            Authentication authentication) {

        String email = authentication.getName();

        User farmer = userService.getUserByEmail(email);

        return ResponseEntity.ok(
                orderService.updateFarmerOrderStatus(
                        id,
                        request,
                        farmer
                )
        );
    }
    @GetMapping("/{id}")
    public ResponseEntity<OrderResponse> getFarmerOrder(
            @PathVariable Long id,
            Authentication authentication) {

        String email = authentication.getName();

        User farmer = userService.getUserByEmail(email);

        return ResponseEntity.ok(
                orderService.getFarmerOrder(id, farmer)
        );
    }
}