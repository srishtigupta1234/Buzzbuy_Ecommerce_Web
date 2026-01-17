package com.buzzbuy.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.buzzbuy.model.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {

	  @Query("SELECT o FROM Order o WHERE o.user.id = :userId AND " +
	           "(o.orderStatus IN ('PLACED','CONFIRMED','SHIPPED','DELIVERED'))")
	   public List<Order> getUserOrders(@Param("userId") Long userId);

	   public List<Order> findByUser_Id(Long userId);
}
