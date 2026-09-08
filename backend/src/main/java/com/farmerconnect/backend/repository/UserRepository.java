package com.farmerconnect.backend.repository;

import com.farmerconnect.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}