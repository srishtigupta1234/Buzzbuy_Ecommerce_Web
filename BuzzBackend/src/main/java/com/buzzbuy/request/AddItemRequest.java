package com.buzzbuy.request;

import com.fasterxml.jackson.annotation.JsonProperty;

public class AddItemRequest {

	private Long productId;
	private String size;
	private Integer quantity;
	public Long getProductId() {
		return productId;
	}
	public void setProductId(Long productId) {
		this.productId = productId;
	}
	public String getSize() {
		return size;
	}
	public void setSize(String size) {
		this.size = size;
	}
	public Integer getQuantity() {
		return quantity;
	}
	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}
	public AddItemRequest(Long productId, String size, Integer quantity) {
		super();
		this.productId = productId;
		this.size = size;
		this.quantity = quantity;
	
	}
	public AddItemRequest() {
		
	}
	
	
	
}
