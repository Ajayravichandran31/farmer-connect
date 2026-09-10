package com.farmerconnect.backend.exception;

public class BuyerProfileAlreadyExistsException extends RuntimeException {

    public BuyerProfileAlreadyExistsException(String message) {
        super(message);
    }
}