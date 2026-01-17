package com.buzzbuy.model;

import jakarta.persistence.Embeddable;

@Embeddable
public class Size {

	private String name;
	private Integer quantity;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Integer getQuantity() {
		return quantity;
	}
	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}
	public Size(String name, Integer quantity) {
		super();
		this.name = name;
		this.quantity = quantity;
	}
	public Size() {
		super();
	}
	
}
