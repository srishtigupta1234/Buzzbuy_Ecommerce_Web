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
import com.buzzbuy.model.Rating;
import com.buzzbuy.model.User;
import com.buzzbuy.request.RatingRequest;
import com.buzzbuy.service.RatingService;
import com.buzzbuy.service.UserService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

public class RatingController {

	@Autowired
    private RatingService ratingService;
    
    @Autowired
    private UserService userService; 

   
    @PostMapping("/")
    public ResponseEntity<Rating> createRatingHandler(
            @RequestBody RatingRequest req,
            @RequestHeader("Authorization") String jwt) throws ProductException, UserException {
        
     
    	User user = userService.findUserProfileByJwt(jwt);
        
        Rating rating = ratingService.createRating(req, user);
        
        return new ResponseEntity<>(rating, HttpStatus.CREATED);
    }


    @GetMapping("/product/{productId}")
    public ResponseEntity<List<Rating>> getProductRatingsHandler(
            @PathVariable Long productId,    @RequestHeader("Authorization") String jwt) throws UserException {

    	User user = userService.findUserProfileByJwt(jwt);
        List<Rating> ratings = ratingService.getProductsRating(productId);
        
        return new ResponseEntity<>(ratings, HttpStatus.OK);
    }
}
