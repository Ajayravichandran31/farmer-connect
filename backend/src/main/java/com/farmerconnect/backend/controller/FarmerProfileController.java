package com.farmerconnect.backend.controller;

import com.farmerconnect.backend.dto.FarmerProfileResponse;
import com.farmerconnect.backend.entity.FarmerProfile;
import com.farmerconnect.backend.entity.User;
import com.farmerconnect.backend.service.FarmerProfileService;
import com.farmerconnect.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/farmer/profile")
public class FarmerProfileController {

    private final FarmerProfileService farmerProfileService;
    private final UserService userService;

    public FarmerProfileController(FarmerProfileService farmerProfileService,
                                   UserService userService) {
        this.farmerProfileService = farmerProfileService;
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<FarmerProfileResponse> createProfile(
            @RequestBody FarmerProfile profile,
            Authentication authentication) {

        String email = authentication.getName();

        User user = userService.getUserByEmail(email);

        FarmerProfile savedProfile =
                farmerProfileService.createProfile(profile, user);

        FarmerProfileResponse response = new FarmerProfileResponse(
                savedProfile.getId(),
                savedProfile.getFarmName(),
                savedProfile.getAddress(),
                savedProfile.getDistrict(),
                savedProfile.getState(),
                savedProfile.getPincode(),
                savedProfile.getCrops(),
                user.getId(),
                user.getName(),
                user.getEmail()
        );

        return ResponseEntity.ok(response);
    }
    @GetMapping
    public ResponseEntity<FarmerProfileResponse> getProfile(
            Authentication authentication) {

        String email = authentication.getName();

        User user = userService.getUserByEmail(email);

        return farmerProfileService.getProfileByUserId(user.getId())
                .map(profile -> {

                    FarmerProfileResponse response = new FarmerProfileResponse(
                            profile.getId(),
                            profile.getFarmName(),
                            profile.getAddress(),
                            profile.getDistrict(),
                            profile.getState(),
                            profile.getPincode(),
                            profile.getCrops(),
                            user.getId(),
                            user.getName(),
                            user.getEmail()
                    );

                    return ResponseEntity.ok(response);
                })
                .orElse(ResponseEntity.notFound().build());
    }
    @PutMapping
    public ResponseEntity<FarmerProfileResponse> updateProfile(
            @RequestBody FarmerProfile updatedProfile,
            Authentication authentication) {

        String email = authentication.getName();

        User user = userService.getUserByEmail(email);

        FarmerProfile updated =
                farmerProfileService.updateProfile(updatedProfile, user);

        FarmerProfileResponse response = new FarmerProfileResponse(
                updated.getId(),
                updated.getFarmName(),
                updated.getAddress(),
                updated.getDistrict(),
                updated.getState(),
                updated.getPincode(),
                updated.getCrops(),
                user.getId(),
                user.getName(),
                user.getEmail()
        );

        return ResponseEntity.ok(response);
    }
}