package com.buzzbuy.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.buzzbuy.exception.CartException;
import com.buzzbuy.exception.OrderException;
import com.buzzbuy.model.Address;
import com.buzzbuy.model.Order;
import com.buzzbuy.model.User;



@Service
public interface OrderService {

	public Order createOrder(User user, Address shippingAddress) throws CartException;
	public Order findOrderById(Long orderId) throws OrderException;
	public List<Order> userOrderHistory(Long userId);
	public Order placeOrder(Long orderId) throws OrderException;
	public Order confirmedOrder(Long orderId) throws OrderException;
	public Order shippedOrder(Long orderId) throws OrderException;
	public Order deliveredOrder(Long orderId) throws OrderException;
	public Order canceledOrder(Long orderId) throws OrderException;
	public List<Order> getAllOrders();
	public void deleteOrder(Long ordeId) throws OrderException;
	public List<Order> getUserOrders(Long id);
	
}
