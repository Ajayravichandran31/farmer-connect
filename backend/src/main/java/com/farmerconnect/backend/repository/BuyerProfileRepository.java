package com.farmerconnect.backend.repository;

import com.farmerconnect.backend.entity.BuyerProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BuyerProfileRepository extends JpaRepository<BuyerProfile, Long> {

    Optional<BuyerProfile> findByUserId(Long userId);
}