package com.buzzbuy.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.buzzbuy.exception.ProductException;
import com.buzzbuy.exception.UserException;
import com.buzzbuy.model.Product;
import com.buzzbuy.model.User;
import com.buzzbuy.repository.UserRepository;
import com.buzzbuy.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@GetMapping("/profile")
	public ResponseEntity<User> findProductByIdHandler(@RequestHeader("Authorization") String jwt) throws UserException{
		User user = userService.findUserProfileByJwt(jwt);
		return new ResponseEntity<User>(user, HttpStatus.ACCEPTED);
	}

}
