package com.farmerconnect.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class ProductResponse {

    private Long id;
    private String productName;
    private String category;
    private BigDecimal price;
    private Integer quantity;
    private String description;
    private LocalDateTime createdAt;

    private Long farmerId;
    private String farmerName;
}