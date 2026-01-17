package com.buzzbuy.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.buzzbuy.exception.ProductException;
import com.buzzbuy.model.Product;
import com.buzzbuy.model.Review;
import com.buzzbuy.model.User;
import com.buzzbuy.repository.ProductRepository;
import com.buzzbuy.repository.ReviewRepository;
import com.buzzbuy.request.ReviewRequest;

@Service
public class ReviewServiceImpl implements ReviewService{

	@Autowired
	private ReviewRepository reviewRepository;
	@Autowired
	private ProductService productService;
	@Autowired
	private ProductRepository productRepository;
	
	@Override
	public Review createReview(ReviewRequest req, User user) throws ProductException {
		Product product = productService.findProductById(req.getProductId());
		Review review = new Review();
		review.setProduct(product);
		review.setReview(req.getReview());
		review.setUser(user);
	
		return reviewRepository.save(review);
	}

	@Override
	public List<Review> getAllReview(Long productId) {
		
		return reviewRepository.getAllProductsReview(productId);
	}

	
}
