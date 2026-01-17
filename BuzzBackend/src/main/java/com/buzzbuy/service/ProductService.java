package com.buzzbuy.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.buzzbuy.exception.ProductException;
import com.buzzbuy.model.Product;
import com.buzzbuy.model.Size;
import com.buzzbuy.request.CreateProductRequest;
import com.buzzbuy.request.UpdateProductRequest;

public interface ProductService {
	public Product createProduct(CreateProductRequest req);
	public String deleteProduct(Long productId) throws ProductException;
    public Product updateProduct(Long productId,UpdateProductRequest req) throws ProductException;
    public Product findProductById(Long productId) throws ProductException;
    public List<Product> findProductByCategory(String category);
    public Page<Product> getAllProduct(String category, List<String> colors, List<String> size, Integer minPrice, Integer maxPrice,Integer minDiscount, String sort,String stock, Integer pageNumber, Integer pageSize);
}
