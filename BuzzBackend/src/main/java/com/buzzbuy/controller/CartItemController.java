package com.buzzbuy.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.buzzbuy.exception.CartItemException;
import com.buzzbuy.exception.UserException;
import com.buzzbuy.model.CartItem;
import com.buzzbuy.model.User;
import com.buzzbuy.response.ApiResponse;
import com.buzzbuy.service.CartItemService;
import com.buzzbuy.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@RequestMapping("/api/cart_items")
public class CartItemController {

    @Autowired 
    private CartItemService cartItemService;

    @Autowired
    private UserService userService;

    @DeleteMapping("/{cartItemId}")
    @Operation(description = "Remove Cart Item From Cart")
    @io.swagger.v3.oas.annotations.responses.ApiResponse(description = "Delete Item Successfully")
    public ResponseEntity<ApiResponse> deleteCartItem(
            @PathVariable Long cartItemId,
            @RequestHeader("Authorization") String jwt
    ) throws UserException, CartItemException {

        User user = userService.findUserProfileByJwt(jwt);
        cartItemService.removeCartItem(user.getId(), cartItemId);

        ApiResponse res = new ApiResponse();
        res.setMessage("Item removed from cart");
        res.setStatus(true);

        return new ResponseEntity<>(res, HttpStatus.OK);
    }
    
    @PutMapping("/{cartItemId}")
    @Operation(description="Updated Item added to cart")
    public ResponseEntity<CartItem> updateCartItem(@RequestBody CartItem cartItem, @PathVariable Long cartItemId, @RequestHeader("Authorization") String jwt) throws UserException, CartItemException{
    
    	User user = userService.findUserProfileByJwt(jwt);
    	CartItem updatedCartItem = cartItemService.updateCartItem(user.getId(), cartItemId, cartItem);
    	System.out.println("cartItem"+ cartItem);
    	return new ResponseEntity<>(updatedCartItem, HttpStatus.OK);
    }
}
