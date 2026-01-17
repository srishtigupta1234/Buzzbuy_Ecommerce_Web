package com.buzzbuy.controller;

import java.util.List;

import com.buzzbuy.exception.ProductException;
import com.buzzbuy.model.Product;
import com.buzzbuy.service.ProductService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ProductController {

	@Autowired
	private ProductService productService;
	
	  @GetMapping("/products")
	    public ResponseEntity<Page<Product>> getAllProductsHandler(
	            @RequestParam(required = false) String category,
	            @RequestParam(required = false) List<String> color,
	            @RequestParam(required = false) List<String> size,
	            @RequestParam(defaultValue = "0") Integer minPrice,
	            @RequestParam(defaultValue = "1000000") Integer maxPrice,
	            @RequestParam(defaultValue = "0") Integer minDiscount,
	            @RequestParam(defaultValue = "price_low") String sort,
	            @RequestParam(required = false) String stock,
	            @RequestParam(defaultValue = "0") Integer pageNumber,
	            @RequestParam(defaultValue = "10") Integer pageSize) {

	        Page<Product> res = productService.getAllProduct(category, color, size, minPrice, maxPrice, minDiscount,
	                sort, stock, pageNumber, pageSize);
	        System.out.println("CATEGORY RECEIVED = " + category);
	        System.out.println(res);

	        return new ResponseEntity<>(res, HttpStatus.ACCEPTED);
	    }
	
	@GetMapping("/products/id/{productId}")
	public ResponseEntity<Product> findProductByIdHandler(@PathVariable Long productId) throws ProductException{
		Product product = productService.findProductById(productId);
		return new ResponseEntity<>(product, HttpStatus.ACCEPTED);
	}
	
}
