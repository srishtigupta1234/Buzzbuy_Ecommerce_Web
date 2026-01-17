package com.buzzbuy.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.buzzbuy.model.User;

public interface UserRepository extends JpaRepository<User,Long> {
   public User findByEmail(String email);
   
}
