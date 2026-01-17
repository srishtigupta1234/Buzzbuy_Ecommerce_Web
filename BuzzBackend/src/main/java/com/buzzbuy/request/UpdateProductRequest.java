package com.buzzbuy.request;

public class UpdateProductRequest {
    private Integer price;
    private Integer quantity;
    private Integer discountedPrice;
    private Integer discountedPercent;
    private String color;
    private String brand;
    private String description;
	public Integer getPrice() {
		return price;
	}
	public void setPrice(Integer price) {
		this.price = price;
	}
	public Integer getQuantity() {
		return quantity;
	}
	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}
	public Integer getDiscountedPrice() {
		return discountedPrice;
	}
	public void setDiscountedPrice(Integer discountedPrice) {
		this.discountedPrice = discountedPrice;
	}
	public Integer getDiscountedPercent() {
		return discountedPercent;
	}
	public void setDiscountedPercent(Integer discountedPercent) {
		this.discountedPercent = discountedPercent;
	}
	public String getColor() {
		return color;
	}
	public void setColor(String color) {
		this.color = color;
	}
	public String getBrand() {
		return brand;
	}
	public void setBrand(String brand) {
		this.brand = brand;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public UpdateProductRequest(Integer price, Integer quantity, Integer discountedPrice, Integer discountedPercent,
			String color, String brand, String description) {
		super();
		this.price = price;
		this.quantity = quantity;
		this.discountedPrice = discountedPrice;
		this.discountedPercent = discountedPercent;
		this.color = color;
		this.brand = brand;
		this.description = description;
	}
	public UpdateProductRequest() {
		super();
	}
    
}
