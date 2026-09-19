package com.farmerconnect.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PlaceOrderRequest {

    private Long productId;

    private Integer quantity;
}