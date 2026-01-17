package com.buzzbuy.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;

import com.buzzbuy.exception.ProductException;
import com.buzzbuy.exception.UserException;
import com.buzzbuy.model.Review;
import com.buzzbuy.model.User;
import com.buzzbuy.request.ReviewRequest;
import com.buzzbuy.service.ReviewService;
import com.buzzbuy.service.UserService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

public class ReviewController {

	
	@Autowired
    private ReviewService reviewService;
    
    @Autowired
    private UserService userService; 
  
    @PostMapping("/")
    public ResponseEntity<Review> createReviewHandler(
            @RequestBody ReviewRequest req,
            @RequestHeader("Authorization") String jwt) throws ProductException, UserException {
        
      
    	 User user = userService.findUserProfileByJwt(jwt);
        
        Review review = reviewService.createReview(req, user);
        
        return new ResponseEntity<>(review, HttpStatus.CREATED);
    }

   
    @GetMapping("/product/{productId}")
    public ResponseEntity<List<Review>> getProductReviewsHandler(
            @PathVariable Long productId) {
        
        List<Review> reviews = reviewService.getAllReview(productId);
        
        return new ResponseEntity<>(reviews, HttpStatus.OK);
    }
}
