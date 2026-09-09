package com.farmerconnect.backend.service;

import com.farmerconnect.backend.entity.FarmerProfile;
import com.farmerconnect.backend.entity.User;
import com.farmerconnect.backend.exception.FarmerProfileAlreadyExistsException;
import com.farmerconnect.backend.repository.FarmerProfileRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class FarmerProfileService {

    private final FarmerProfileRepository farmerProfileRepository;

    public FarmerProfileService(FarmerProfileRepository farmerProfileRepository) {
        this.farmerProfileRepository = farmerProfileRepository;
    }

    public FarmerProfile createProfile(FarmerProfile profile, User user) {

        if (farmerProfileRepository.findByUserId(user.getId()).isPresent()) {
            throw new FarmerProfileAlreadyExistsException(
                    "Farmer profile already exists"
            );
        }

        profile.setUser(user);

        return farmerProfileRepository.save(profile);
    }

    public Optional<FarmerProfile> getProfileByUserId(Long userId) {

        return farmerProfileRepository.findByUserId(userId);
    }
    public FarmerProfile updateProfile(FarmerProfile updatedProfile, User user) {

        FarmerProfile existingProfile = farmerProfileRepository
                .findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Farmer profile not found"));

        existingProfile.setFarmName(updatedProfile.getFarmName());
        existingProfile.setAddress(updatedProfile.getAddress());
        existingProfile.setDistrict(updatedProfile.getDistrict());
        existingProfile.setState(updatedProfile.getState());
        existingProfile.setPincode(updatedProfile.getPincode());
        existingProfile.setCrops(updatedProfile.getCrops());

        return farmerProfileRepository.save(existingProfile);
    }
}