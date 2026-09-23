package com.farmerconnect.backend.dto;

import com.farmerconnect.backend.entity.OrderStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateOrderStatusRequest {

    private OrderStatus status;
}