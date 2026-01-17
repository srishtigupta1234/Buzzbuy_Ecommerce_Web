package com.buzzbuy.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.buzzbuy.exception.CartItemException;
import com.buzzbuy.exception.UserException;
import com.buzzbuy.model.Cart;
import com.buzzbuy.model.CartItem;
import com.buzzbuy.model.Product;
import com.buzzbuy.model.Size;
import com.buzzbuy.model.User;
import com.buzzbuy.repository.CartItemRepository;
import com.buzzbuy.repository.CartRepository;

@Service
public class CartItemServiceImpl implements CartItemService {

	@Autowired
	private CartItemRepository cartItemRepository;
	@Autowired
	private UserService userService;
	@Autowired
	private CartRepository cartRepository;
	
	@Override
	public CartItem createCartItem(CartItem cartItem) {
		if (cartItem.getQuantity() == null || cartItem.getQuantity() < 1) {
		    cartItem.setQuantity(1);
		}
		cartItem.setPrice(cartItem.getProduct().getPrice()*cartItem.getQuantity());
		cartItem.setDiscountedPrice(cartItem.getProduct().getDiscountedPrice()*cartItem.getQuantity());
		
		CartItem createdCartItem = cartItemRepository.save(cartItem);
		return createdCartItem;
	}
	@Override
	public CartItem updateCartItem(Long userId, Long id, CartItem cartItem)
	        throws CartItemException, UserException {

	    CartItem item = findCartItembyId(id);
        User user = userService.findUserById(item.getUserId());
        
//	    // 🔐 Authorization
//	    if (!item.getUserId().equals(userId)) {
//	        throw new UserException("Unauthorized access to cart item");
//	    }
//
//	    Integer newQty = cartItem.getQuantity();
//
//	    // 🔒 Quantity validation
//	    if (newQty == null || newQty < 1) {
//	        throw new CartItemException("Quantity must be at least 1");
//	    }
//
//	    Product product = item.getProduct();
//
//	    // 📦 Stock validation (size-wise)
//	    if (item.getSize() != null) {
//	        Size productSize = product.getSizes().stream()
//	                .filter(s -> s.getName().equals(item.getSize()))
//	                .findFirst()
//	                .orElseThrow(() -> new CartItemException("Selected size not found"));
//
//	        if (newQty > productSize.getQuantity()) {
//	            throw new CartItemException("Not enough stock for selected size");
//	        }
//	    }

	    // ✅ Correct updates
        if(user.getId().equals(userId)) {
        	item.setQuantity(cartItem.getQuantity());
    	    item.setPrice(item.getQuantity() * item.getProduct().getPrice());
    	    item.setDiscountedPrice(item.getProduct().getDiscountedPrice() * item.getQuantity());
        }
	    
	    return cartItemRepository.save(item);
	}

	@Override
	public CartItem isCartItemExist(Long cartId, Long productId, String size, Long userId) {
	    CartItem cartItem = cartItemRepository.isCartItemExist(cartId, productId, size, userId);
	    return cartItem;
	}
	@Override
	public void removeCartItem(Long userId, Long cartItemId) throws CartItemException, UserException {
		CartItem cartItem = findCartItembyId(cartItemId);
		User user = userService.findUserById(cartItem.getUserId());
		User reqUser = userService.findUserById(userId);
		if(user.getId().equals(reqUser.getId())) {
			cartItemRepository.deleteById(cartItemId);
		}else {
			throw new UserException("You can't remove another users item.");
		}
	}

	@Override
	public CartItem findCartItembyId(Long cartItemId) throws CartItemException {
		Optional<CartItem> opt = cartItemRepository.findById(cartItemId);;
		if(opt.isPresent()){
			return opt.get();
		}else {
			throw new CartItemException("Cart item not found with id: "+cartItemId);
		}
	}

}
