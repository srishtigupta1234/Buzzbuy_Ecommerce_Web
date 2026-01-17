package com.buzzbuy.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.buzzbuy.repository.UserRepository;
import com.buzzbuy.request.LoginRequest;
import com.buzzbuy.response.AuthReponse;
import com.buzzbuy.service.CartService;
import com.buzzbuy.service.CustomUserServiceImpl;
import com.buzzbuy.config.JwtProvider;
import com.buzzbuy.exception.UserException;
import com.buzzbuy.model.Cart;
import com.buzzbuy.model.User;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;

@RestController
@RequestMapping("/auth")
public class AuthController {
	
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private JwtProvider jwtProvider;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private CustomUserServiceImpl customUserService;
	@Autowired
	private CartService cartService;
	
   @PostMapping("/signup")
   public ResponseEntity<AuthReponse> createUserHandler(@RequestBody User user) throws UserException{
	   String email = user.getEmail();
	   String password = user.getPassword();
	   String firstName = user.getFirstName();
	   String lastName= user.getLastName();
	   String mobile = user.getMobile();
	   String role = user.getRole();
	   User isEmailExist = userRepository.findByEmail(email);
	   if(isEmailExist != null) {
		   throw new UserException("Email is already used with another account");
	   }
	   User createdUser = new User();
	   createdUser.setEmail(email);
	   createdUser.setPassword(passwordEncoder.encode(password));
	   createdUser.setFirstName(firstName);
	   createdUser.setLastName(lastName);
	   createdUser.setMobile(mobile);
	   createdUser.setRole(role);
	   createdUser.setCreatedAt(LocalDateTime.now());
	   User savedUser = userRepository.save(createdUser);
	   Cart cart = cartService.createCart(savedUser);
	   Authentication authentication = new UsernamePasswordAuthenticationToken(savedUser.getEmail(),savedUser.getPassword());
	   SecurityContextHolder.getContext().setAuthentication(authentication);
	   String token = jwtProvider.generateToken(authentication);
	   AuthReponse authReponse = new AuthReponse();
	   authReponse.setJwt(token);
	   authReponse.setMsg("Signup Success");
	   return new ResponseEntity<AuthReponse>(authReponse,HttpStatus.CREATED);
   }
   @PostMapping("/signin")
   private ResponseEntity<AuthReponse> loginUserHandler(@RequestBody LoginRequest loginRequest){
	 String username = loginRequest.getEmail();
	 String password = loginRequest.getPassword();
	 Authentication authentication = authenticate(username,password);
	 SecurityContextHolder.getContext().setAuthentication(authentication);
	 String token = jwtProvider.generateToken(authentication);
	 AuthReponse authReponse = new AuthReponse();
	  authReponse.setJwt(token);
	  authReponse.setMsg("Signin Success");
	 return new ResponseEntity<AuthReponse>(authReponse,HttpStatus.CREATED);
   }

   private Authentication authenticate(String username, String password) {
	 UserDetails userDetails = customUserService.loadUserByUsername(username);
	 if(userDetails==null) {
		 throw new BadCredentialsException("Invalid Username..");
	 }
	 if(!passwordEncoder.matches(password, userDetails.getPassword())) {
		 throw new BadCredentialsException("Invalid Password..");
	 }
	return new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
   }
}
