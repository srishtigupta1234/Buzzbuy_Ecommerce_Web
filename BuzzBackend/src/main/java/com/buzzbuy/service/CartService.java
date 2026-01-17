package com.buzzbuy.service;

import com.buzzbuy.exception.CartException;
import com.buzzbuy.exception.ProductException;
import com.buzzbuy.model.Cart;
import com.buzzbuy.model.User;
import com.buzzbuy.request.AddItemRequest;

public interface CartService {

	public Cart createCart(User user);
	public String addCartItem(Long userId, AddItemRequest req) throws ProductException, CartException;
	public Cart findUserCart(Long userId) throws CartException;
}
