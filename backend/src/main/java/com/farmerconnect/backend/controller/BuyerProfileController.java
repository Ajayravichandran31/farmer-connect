package com.farmerconnect.backend.controller;

import com.farmerconnect.backend.dto.BuyerProfileResponse;
import com.farmerconnect.backend.entity.BuyerProfile;
import com.farmerconnect.backend.service.BuyerProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/buyer/profile")
public class BuyerProfileController {

    private final BuyerProfileService buyerProfileService;

    public BuyerProfileController(BuyerProfileService buyerProfileService) {
        this.buyerProfileService = buyerProfileService;
    }

    @PostMapping
    public ResponseEntity<BuyerProfileResponse> createProfile(
            @RequestBody BuyerProfile profile,
            Authentication authentication) {

        String email = authentication.getName();

        BuyerProfile createdProfile =
                buyerProfileService.createProfile(email, profile);

        return ResponseEntity.ok(convertToResponse(createdProfile));
    }

    @GetMapping
    public ResponseEntity<BuyerProfileResponse> getProfile(
            Authentication authentication) {

        String email = authentication.getName();

        BuyerProfile profile =
                buyerProfileService.getProfileByUserEmail(email);

        return ResponseEntity.ok(convertToResponse(profile));
    }

    @PutMapping
    public ResponseEntity<BuyerProfileResponse> updateProfile(
            @RequestBody BuyerProfile profile,
            Authentication authentication) {

        String email = authentication.getName();

        BuyerProfile updatedProfile =
                buyerProfileService.updateProfile(email, profile);

        return ResponseEntity.ok(convertToResponse(updatedProfile));
    }

    private BuyerProfileResponse convertToResponse(BuyerProfile profile) {

        BuyerProfileResponse response = new BuyerProfileResponse();

        response.setId(profile.getId());
        response.setAddress(profile.getAddress());
        response.setDistrict(profile.getDistrict());
        response.setState(profile.getState());
        response.setPincode(profile.getPincode());

        response.setUserId(profile.getUser().getId());
        response.setBuyerName(profile.getUser().getName());
        response.setEmail(profile.getUser().getEmail());

        return response;
    }
}