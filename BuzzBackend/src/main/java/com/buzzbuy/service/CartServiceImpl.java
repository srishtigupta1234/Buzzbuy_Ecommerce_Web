package com.buzzbuy.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.buzzbuy.exception.CartException;
import com.buzzbuy.exception.ProductException;
import com.buzzbuy.model.Cart;
import com.buzzbuy.model.CartItem;
import com.buzzbuy.model.Product;
import com.buzzbuy.model.User;
import com.buzzbuy.repository.CartRepository;
import com.buzzbuy.request.AddItemRequest;

@Service
public class CartServiceImpl implements CartService {

	@Autowired
	private CartRepository cartRepository;
	@Autowired
	private CartItemService cartItemService;
	@Autowired
	private ProductService productService;
	
	@Override
	public Cart createCart(User user) {
		Cart cart = new Cart();
		cart.setUser(user);
		  // ✅ Initialize mandatory fields
	    cart.setTotalPrice((double) 0);
	    cart.setTotalDiscountedPrice(0);
	    cart.setTotalItem(0);
	    cart.setDiscount(0);

		return cartRepository.save(cart);
	}

	@Override
	public String addCartItem(Long userId, AddItemRequest req) throws ProductException, CartException {
		Cart cart = cartRepository.findByUserId(userId);
		if (cart == null) {
		       // If cart is null, throw or create cart here.
		       throw new CartException("Cart not found for user ID: " + userId);
		    }

		    // NEW CRITICAL STEP: Accessing the ID and SAVING it ensures it's managed 
		    // AND attached to the current session, guaranteeing a non-null ID for the HQL.
		    Long cartId = cart.getId();
		    if (cartId == null) {
		       // This indicates an unsaved entity. Force the save to generate the ID.
		       cart = cartRepository.save(cart);
		       cartId = cart.getId();
		       if (cartId == null) {
		            throw new CartException("Failed to save Cart entity and generate ID.");
		       }
		    }		  
		    Product product = productService.findProductById(req.getProductId());
		    
		    if (product == null || product.getId() == null) {
		        throw new ProductException("Product ID is invalid or null: " + req.getProductId());
		    }
		CartItem isPresent = cartItemService.isCartItemExist(
		    cart.getId(),           // Pass Cart ID (Long)
		    product.getId(),        // Pass Product ID (Long)
		    req.getSize(), 
		    userId
		);
		if(isPresent==null) {
			CartItem cartItem = new CartItem();
			cartItem.setProduct(product);
			cartItem.setQuantity(req.getQuantity());
			cartItem.setCart(cart);
			cartItem.setUserId(userId);
			
			int price = req.getQuantity()*product.getDiscountedPrice();
			cartItem.setPrice(price);
			cartItem.setSize(req.getSize());
			
			CartItem createCartItem = cartItemService.createCartItem(cartItem);
			cart.getCartItems().add(createCartItem);
		}
		return "Item Added To Cart";
	}

	@Override
	public Cart findUserCart(Long userId) {
		Cart cart = cartRepository.findByUserId(userId);
		double totalPrice = 0;
		int totalDiscountedPrice = 0;
		int totalItem = 0;
		
		for(CartItem cartItem:cart.getCartItems()) {
			totalPrice+=cartItem.getPrice();
			totalDiscountedPrice+=cartItem.getDiscountedPrice();
			totalItem+=cartItem.getQuantity();
		}
		cart.setTotalDiscountedPrice(totalDiscountedPrice);
		cart.setTotalItem(totalItem);
	     cart.setTotalPrice(totalPrice);
		cart.setDiscount(totalPrice-totalDiscountedPrice);
		
		return cartRepository.save(cart);
	}

}
