package com.buzzbuy.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.buzzbuy.model.Cart;
import com.buzzbuy.model.CartItem;
import com.buzzbuy.model.Product;
import com.buzzbuy.model.Size;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    @Query("SELECT ci FROM CartItem ci WHERE ci.cart.id = :cartId AND ci.product.id = :productId AND ci.size = :size AND ci.userId = :userId")
    public CartItem isCartItemExist(
        @Param("cartId") Long cartId, 
        @Param("productId") Long productId, 
        @Param("size") String size, 
        @Param("userId") Long userId
    );
    
    @Modifying
    @Transactional
    @Query("DELETE FROM CartItem ci WHERE ci.product.id = :productId")
    void deleteByProductId(@Param("productId") Long productId);
}