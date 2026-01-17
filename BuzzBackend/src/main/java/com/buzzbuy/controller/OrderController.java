package com.buzzbuy.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.buzzbuy.exception.CartException;
import com.buzzbuy.exception.OrderException;
import com.buzzbuy.exception.UserException;
import com.buzzbuy.model.Address;
import com.buzzbuy.model.Order;
import com.buzzbuy.model.User;
import com.buzzbuy.service.OrderService;
import com.buzzbuy.service.UserService;

import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/orders")
public class OrderController {

	@Autowired
	private OrderService orderService;
	@Autowired
	private UserService userService;
	
	@PostMapping("/")
	public ResponseEntity<Order> createOrder(@RequestBody Address shippingAddress, @RequestHeader("Authorization") String jwt) throws UserException, CartException{
		User user= userService.findUserProfileByJwt(jwt);
		Order order = orderService.createOrder(user, shippingAddress);
		return new ResponseEntity<Order>(order, HttpStatus.CREATED);
	}
	
	@GetMapping("/user")
	public ResponseEntity<List<Order>> userOrderHistory(@RequestHeader("Authorization") String jwt)throws UserException{
		User user = userService.findUserProfileByJwt(jwt);
		List<Order> order = orderService.userOrderHistory(user.getId());
		return new ResponseEntity<>(order, HttpStatus.OK);
	}
	@GetMapping("/{Id}")
	public ResponseEntity<Order> findOrderById(@PathVariable("Id") Long OrderId, @RequestHeader("Authorization") String jwt)throws UserException, OrderException{
		User user = userService.findUserProfileByJwt(jwt);
		Order order = orderService.findOrderById(OrderId);
		return new ResponseEntity<>(order,HttpStatus.CREATED);
	}
	
	
}
