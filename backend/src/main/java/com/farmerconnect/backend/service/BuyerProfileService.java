package com.farmerconnect.backend.service;

import com.farmerconnect.backend.entity.BuyerProfile;
import com.farmerconnect.backend.entity.User;
import com.farmerconnect.backend.repository.BuyerProfileRepository;
import com.farmerconnect.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import com.farmerconnect.backend.exception.BuyerProfileAlreadyExistsException;

import java.util.Optional;

@Service
public class BuyerProfileService {

    private final BuyerProfileRepository buyerProfileRepository;
    private final UserRepository userRepository;

    public BuyerProfileService(BuyerProfileRepository buyerProfileRepository,
                               UserRepository userRepository) {
        this.buyerProfileRepository = buyerProfileRepository;
        this.userRepository = userRepository;
    }

    public BuyerProfile createProfile(String email, BuyerProfile profile) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (buyerProfileRepository.findByUserId(user.getId()).isPresent()) {
            throw new BuyerProfileAlreadyExistsException("Buyer profile already exists");
        }

        profile.setUser(user);

        return buyerProfileRepository.save(profile);
    }

    public BuyerProfile getProfileByUserEmail(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return buyerProfileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Buyer profile not found"));
    }

    public BuyerProfile updateProfile(String email, BuyerProfile updatedProfile) {

        BuyerProfile existingProfile = getProfileByUserEmail(email);

        existingProfile.setAddress(updatedProfile.getAddress());
        existingProfile.setDistrict(updatedProfile.getDistrict());
        existingProfile.setState(updatedProfile.getState());
        existingProfile.setPincode(updatedProfile.getPincode());

        return buyerProfileRepository.save(existingProfile);
    }
}