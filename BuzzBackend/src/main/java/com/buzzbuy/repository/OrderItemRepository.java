package com.buzzbuy.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.buzzbuy.model.Order;
import com.buzzbuy.model.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long>{

}
