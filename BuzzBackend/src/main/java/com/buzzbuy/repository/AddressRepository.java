package com.buzzbuy.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.buzzbuy.model.Address;
import com.buzzbuy.model.Order;

public interface AddressRepository extends JpaRepository<Address, Long> {

}
