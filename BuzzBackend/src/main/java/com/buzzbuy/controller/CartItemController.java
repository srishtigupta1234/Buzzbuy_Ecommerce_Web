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
import com.buzzbuy.request.UpdateCartItemRequest;
import com.buzzbuy.response.ApiResponse;
import com.buzzbuy.service.CartItemService;
import com.buzzbuy.service.UserService;

import io.swagger.v3.oas.annotations.Operation;

import org.springframework.web.bind.annotation.RequestBody;
import jakarta.validation.Valid;

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
    @Operation(description = "Update item quantity in cart")
    public ResponseEntity<CartItem> updateCartItem(
            @RequestBody UpdateCartItemRequest cartItemRequest,
            @PathVariable Long cartItemId,
            @RequestHeader("Authorization") String jwt
    ) throws UserException, CartItemException {

        // Find user from JWT
        User user = userService.findUserProfileByJwt(jwt);

        // Call service to update
        CartItem updatedCartItem = cartItemService.updateCartItem(
                user.getId(), cartItemId, cartItemRequest
        );

        System.out.println("CartItem qty: " + cartItemRequest.getQuantity());

        return new ResponseEntity<>(updatedCartItem, HttpStatus.OK);
    }

}
