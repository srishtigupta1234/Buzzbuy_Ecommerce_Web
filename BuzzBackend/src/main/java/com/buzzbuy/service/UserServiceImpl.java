package com.buzzbuy.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.buzzbuy.config.JwtProvider;
import com.buzzbuy.exception.UserException;
import com.buzzbuy.model.User;
import com.buzzbuy.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private JwtProvider jwtProvider;
	

	@Override
	public User findUserById(Long userId) throws UserException {
		Optional<User> user = userRepository.findById(userId);
		if(user.isPresent()) {
			return user.get();
		}
		throw new UserException("User not found with provided id: "+ userId);
	}

	@Override
	public User findUserProfileByJwt(String jwt) throws UserException {
		String email = jwtProvider.getEmailFromToken(jwt);
		User user = userRepository.findByEmail(email);
		if(user==null) {
			throw new UserException("User not found with provided email: "+email);
		}
		return user;
	}

}
