package com.farmerconnect.backend.repository;

import com.farmerconnect.backend.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByBuyerId(Long buyerId);

    List<Order> findByProductFarmerId(Long farmerId);

    Optional<Order> findByIdAndProductFarmerId(Long orderId, Long farmerId);

}