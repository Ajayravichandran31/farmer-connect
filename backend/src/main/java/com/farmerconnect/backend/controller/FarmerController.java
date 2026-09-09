package com.farmerconnect.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FarmerController {

    @GetMapping("/api/farmer/test")
    public String farmerTest() {
        return "Farmer access granted!";
    }
}