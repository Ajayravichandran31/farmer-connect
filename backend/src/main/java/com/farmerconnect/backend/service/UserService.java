package com.farmerconnect.backend.service;

import com.farmerconnect.backend.dto.RegisterRequest;
import com.farmerconnect.backend.entity.User;
import com.farmerconnect.backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.farmerconnect.backend.exception.EmailAlreadyRegisteredException;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User registerUser(RegisterRequest request) {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new EmailAlreadyRegisteredException("Email already registered");
        }

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());

        // Encrypt password before saving
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        user.setPhone(request.getPhone());
        user.setRole(request.getRole());

        return userRepository.save(user);
    }
}