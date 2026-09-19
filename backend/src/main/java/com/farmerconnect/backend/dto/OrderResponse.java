package com.farmerconnect.backend.dto;

import com.farmerconnect.backend.entity.OrderStatus;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
public class OrderResponse {

    private Long id;

    private Long productId;
    private String productName;

    private Integer quantity;
    private BigDecimal totalPrice;

    private OrderStatus status;
    private LocalDateTime createdAt;

    private Long buyerId;
    private String buyerName;
    private String buyerEmail;

    private Long farmerId;
    private String farmerName;
}