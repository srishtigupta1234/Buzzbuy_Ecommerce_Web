package com.buzzbuy.service;

import org.springframework.stereotype.Service;

import com.buzzbuy.exception.UserException;
import com.buzzbuy.model.User;

@Service
public interface UserService{

	public User findUserById(Long userId) throws UserException;
	public User findUserProfileByJwt(String jwt) throws UserException;
	
}
