package com.buzzbuy.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.buzzbuy.exception.CartException;
import com.buzzbuy.exception.ProductException;
import com.buzzbuy.exception.UserException;
import com.buzzbuy.model.Cart;
import com.buzzbuy.model.User;
import com.buzzbuy.request.AddItemRequest;
import com.buzzbuy.response.ApiResponse;
import com.buzzbuy.service.CartService;
import com.buzzbuy.service.UserService;

import io.swagger.v3.oas.annotations.Operation;

import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/api/cart")
public class CartController {
	@Autowired
	private UserService userService;
	@Autowired
	private CartService cartService;
	
	@GetMapping("/")
	@Operation(description="find cart by id")
	public ResponseEntity<Cart> findUserCart(@RequestHeader("Authorization") String jwt) throws UserException, CartException{
		User user = userService.findUserProfileByJwt(jwt);
		Cart cart = cartService.findUserCart(user.getId());
		return new ResponseEntity<Cart>(cart, HttpStatus.OK);
	}
	
	@PutMapping("/add")
	@Operation(description="add item to cart")
	public ResponseEntity<ApiResponse> addItemToCart(@RequestBody AddItemRequest req, @RequestHeader("Authorization")  String jwt) throws UserException,ProductException, CartException{
		System.out.println("Incoming Product ID: " + req.getProductId());
		User user = userService.findUserProfileByJwt(jwt);
		cartService.addCartItem(user.getId(), req);
		ApiResponse res= new ApiResponse();
		res.setMessage("Item Added To Cart");
		res.setStatus(true);
		return new ResponseEntity<>(res,HttpStatus.OK);
	}

}
