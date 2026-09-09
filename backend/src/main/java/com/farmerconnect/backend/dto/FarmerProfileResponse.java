package com.farmerconnect.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FarmerProfileResponse {

    private Long id;
    private String farmName;
    private String address;
    private String district;
    private String state;
    private String pincode;
    private String crops;

    private Long userId;
    private String farmerName;
    private String email;
}