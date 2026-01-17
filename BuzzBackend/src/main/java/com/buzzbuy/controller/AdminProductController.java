package com.buzzbuy.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.buzzbuy.exception.ProductException;
import com.buzzbuy.exception.UserException;
import com.buzzbuy.model.Order;
import com.buzzbuy.model.Product;
import com.buzzbuy.model.User;
import com.buzzbuy.request.CreateProductRequest;
import com.buzzbuy.request.UpdateProductRequest;
import com.buzzbuy.response.ApiResponse;
import com.buzzbuy.service.ProductService;

@RestController
@RequestMapping("/api/admin/products")
public class AdminProductController {

	@Autowired
	private ProductService productService;
	
	@PostMapping("/")
	public ResponseEntity<Product> postProductHandler(@RequestBody CreateProductRequest createProductRequest) throws ProductException{
		Product createdProduct = productService.createProduct(createProductRequest);
	    return new ResponseEntity<Product>(createdProduct, HttpStatus.CREATED);
	}
	
	@DeleteMapping("/{productId}/delete")
	public ResponseEntity<ApiResponse> deleteProduct(@PathVariable Long productId) throws ProductException{
		productService.deleteProduct(productId);
		ApiResponse res = new ApiResponse();
		res.setMessage("Product deleted successfully");
		res.setStatus(true);
		 return new ResponseEntity<>(res, HttpStatus.OK);
	}
	
	@PutMapping("/{productId}/update")
	public ResponseEntity<Product> updateProduct(
	        @PathVariable Long productId,
	        @RequestBody UpdateProductRequest req
	) throws ProductException {

	    Product product = productService.updateProduct(productId, req);
	    return new ResponseEntity<>(product, HttpStatus.OK);
	}

	@PostMapping("/creates")
	public ResponseEntity<ApiResponse> createMultipleProduct(@RequestBody CreateProductRequest[] req) throws ProductException{
		for(CreateProductRequest product:req) {
			productService.createProduct(product);
		}
		ApiResponse res = new ApiResponse();
		res.setMessage("Products added successfully");
		res.setStatus(true);
	    return new ResponseEntity<>(res, HttpStatus.CREATED);
	}
	
}
