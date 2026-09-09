package com.farmerconnect.backend.exception;

public class FarmerProfileAlreadyExistsException extends RuntimeException {

    public FarmerProfileAlreadyExistsException(String message) {
        super(message);
    }
}