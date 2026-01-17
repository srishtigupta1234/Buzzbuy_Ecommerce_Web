package com.buzzbuy.model;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

@Entity
public class Cart {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@OneToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="user_id", nullable=false)
	private User user;
	
	@OneToMany(mappedBy="cart",cascade=CascadeType.ALL, orphanRemoval=true)
	@Column(name="cart_items")
	private Set<CartItem> cartItems = new HashSet<>();
	
	@Column(name="total_price")
	private Double totalPrice;
	
	@Column(name="total_item")
	private Integer totalItem;
	
	private Integer totalDiscountedPrice;
	
	private double discount;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Set<CartItem> getCartItems() {
		return cartItems;
	}

	public void setCartItems(Set<CartItem> cartItems) {
		this.cartItems = cartItems;
	}

	public Double getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(Double totalPrice) {
		this.totalPrice = totalPrice;
	}

	public Integer getTotalItem() {
		return totalItem;
	}

	public void setTotalItem(Integer totalItem) {
		this.totalItem = totalItem;
	}

	public Integer getTotalDiscountedPrice() {
		return totalDiscountedPrice;
	}

	public void setTotalDiscountedPrice(Integer totalDiscountedPrice) {
		this.totalDiscountedPrice = totalDiscountedPrice;
	}

	public double getDiscount() {
		return discount;
	}

	public void setDiscount(double d) {
		this.discount = d;
	}

	public Cart(Long id, User user, Set<CartItem> cartItems, Double totalPrice, Integer totalItem,
			Integer totalDiscountedPrice, Integer discount) {
		super();
		this.id = id;
		this.user = user;
		this.cartItems = cartItems;
		this.totalPrice = totalPrice;
		this.totalItem = totalItem;
		this.totalDiscountedPrice = totalDiscountedPrice;
		this.discount = discount;
	}

	public Cart() {
		super();
	}

	
	
}
