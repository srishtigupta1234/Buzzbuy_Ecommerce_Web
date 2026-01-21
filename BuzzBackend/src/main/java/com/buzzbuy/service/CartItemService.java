package com.buzzbuy.service;

import com.buzzbuy.exception.CartItemException;
import com.buzzbuy.exception.UserException;
import com.buzzbuy.model.Cart;
import com.buzzbuy.model.CartItem;
import com.buzzbuy.model.Product;
import com.buzzbuy.request.UpdateCartItemRequest;

public interface CartItemService {

	public CartItem createCartItem(CartItem cartItem);
	public CartItem updateCartItem(Long userId, Long id, UpdateCartItemRequest cartItem)
	        throws CartItemException, UserException;
	public CartItem isCartItemExist(Long cart, Long product, String size, Long userId);
	public void removeCartItem(Long userId, Long cartItemId) throws CartItemException,UserException;
	public CartItem findCartItembyId(Long cartItemId) throws CartItemException;
}
