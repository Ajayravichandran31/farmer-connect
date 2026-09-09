package com.farmerconnect.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BuyerController {

    @GetMapping("/api/buyer/test")
    public String buyerTest() {
        return "Buyer access granted!";
    }
}