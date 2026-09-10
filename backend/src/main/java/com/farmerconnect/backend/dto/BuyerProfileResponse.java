package com.farmerconnect.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BuyerProfileResponse {

    private Long id;
    private String address;
    private String district;
    private String state;
    private String pincode;

    private Long userId;
    private String buyerName;
    private String email;
}