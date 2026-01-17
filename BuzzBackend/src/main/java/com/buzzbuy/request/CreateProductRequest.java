package com.buzzbuy.request;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.buzzbuy.model.Size;

public class CreateProductRequest {

	private String title;
	private String description;
	private Integer price;
	private Integer discountedPrice;
	private Integer discountedPercent;
	private Integer quantity;
	private String brand;
	private String color;
	private Set<Size> size = new HashSet<>();
	private String imageUrl;
	private String topLevelCategory;
	private String secondLevelCategory;
	private String thirdLevelCategory;
	
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Integer getPrice() {
		return price;
	}
	public void setPrice(Integer price) {
		this.price = price;
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
	public Integer getQuantity() {
		return quantity;
	}
	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}
	public String getBrand() {
		return brand;
	}
	public void setBrand(String brand) {
		this.brand = brand;
	}
	public String getColor() {
		return color;
	}
	public void setColor(String color) {
		this.color = color;
	}
	public Set<Size> getSize() {
		return size;
	}
	public void setSize(Set<Size> size) {
		this.size = size;
	}
	public String getImageUrl() {
		return imageUrl;
	}
	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}
	public String getTopLevelCategory() {
		return topLevelCategory;
	}
	public void setTopLevelCategory(String topLevelCategory) {
		this.topLevelCategory = topLevelCategory;
	}
	public String getSecondLevelCategory() {
		return secondLevelCategory;
	}
	public void setSecondLevelCategory(String secondLevelCategory) {
		this.secondLevelCategory = secondLevelCategory;
	}

	public String getThirdLevelCategory() {
		return thirdLevelCategory;
	}
	public void setThirdLevelCategory(String thirdLevelCategory) {
		this.thirdLevelCategory = thirdLevelCategory;
	}
	public CreateProductRequest(String title, String description, Integer price, Integer discountedPrice,
			Integer discountedPercent, Integer quantity, String brand, String color, Set<Size> size, String imageUrl,
			String topLevelCategory, String secondLevelCategory, String thirdLevelCategory) {
		super();
		this.title = title;
		this.description = description;
		this.price = price;
		this.discountedPrice = discountedPrice;
		this.discountedPercent = discountedPercent;
		this.quantity = quantity;
		this.brand = brand;
		this.color = color;
		this.size = size;
		this.imageUrl = imageUrl;
		this.topLevelCategory = topLevelCategory;
		this.secondLevelCategory = secondLevelCategory;
		this.thirdLevelCategory = thirdLevelCategory;
	}
	public CreateProductRequest() {
		super();
	}
	


	
}
