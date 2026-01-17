package com.buzzbuy.service;

import java.util.List;

import com.buzzbuy.exception.ProductException;
import com.buzzbuy.model.Review;
import com.buzzbuy.model.User;
import com.buzzbuy.request.ReviewRequest;

public interface ReviewService {

	public Review createReview(ReviewRequest req,User user) throws ProductException;
	public List<Review> getAllReview(Long productId);
}
