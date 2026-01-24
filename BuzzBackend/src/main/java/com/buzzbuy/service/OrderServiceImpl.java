package com.buzzbuy.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.buzzbuy.exception.CartException;
import com.buzzbuy.exception.OrderException;
import com.buzzbuy.model.Address;
import com.buzzbuy.model.Cart;
import com.buzzbuy.model.CartItem;
import com.buzzbuy.model.Order;
import com.buzzbuy.model.OrderItem;
import com.buzzbuy.model.User;
import com.buzzbuy.repository.AddressRepository;
import com.buzzbuy.repository.CartRepository;
import com.buzzbuy.repository.OrderItemRepository;
import com.buzzbuy.repository.OrderRepository;
import com.buzzbuy.repository.UserRepository;

@Service
public class OrderServiceImpl implements OrderService {

	@Autowired
	private OrderRepository orderRepository;
	@Autowired
	private AddressRepository addressRepository;
	@Autowired
	private CartService cartService;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private OrderItemRepository orderItemRepository;
	
	@Override
	public Order createOrder(User user, Address shippingAddress) throws CartException {

	    shippingAddress.setUser(user);
	    Address address = addressRepository.save(shippingAddress);

	    Cart cart = cartService.findUserCart(user.getId());

	    Order order = new Order();
	    order.setUser(user);
	    order.setShippingAddress(address);
	    order.setOrderDate(LocalDateTime.now());
	    order.setOrderStatus("PENDING");
	    order.setCreatedAt(LocalDateTime.now());
	    order.getPaymentDetails().setStatus("PENDING");

	    List<OrderItem> orderItems = new ArrayList<>();

	    for (CartItem item : cart.getCartItems()) {
	        OrderItem orderItem = new OrderItem();
	        orderItem.setProduct(item.getProduct());
	        orderItem.setQuantity(item.getQuantity());
	        orderItem.setSize(item.getSize());
	        orderItem.setPrice(item.getPrice());
	        orderItem.setDiscountedPrice(item.getDiscountedPrice());
	        orderItem.setUserId(item.getUserId());

	        orderItem.setOrder(order);
	        orderItems.add(orderItem);
	    }

	    order.setOrderItems(orderItems);
	    order.setTotalPrice(cart.getTotalPrice());
	    order.setTotalDiscountedPrice(cart.getTotalDiscountedPrice());
	    order.setDiscount(cart.getDiscount());
	    order.setTotalItem(cart.getTotalItem());

	    // 🔥 Generate orderId BEFORE saving
	    order.setOrderId("ORD-" + System.currentTimeMillis());

	    return orderRepository.save(order); // ✅ only ONE save
	}
	@Override
	public Order findOrderById(Long orderId) throws OrderException {
	    return orderRepository.findById(orderId)
	        .orElseThrow(() -> new OrderException("Order not found with id " + orderId));
	}


	@Override
	public List<Order> userOrderHistory(Long userId) {
		System.out.println(userId);
	    return orderRepository.getUserOrders(userId);
	}

	@Override
	public Order placeOrder(Long orderId) throws OrderException {
	    Order order = findOrderById(orderId);
	    order.setOrderStatus("PLACED");
	    order.getPaymentDetails().setStatus("COMPLETED");
	    return orderRepository.save(order);
	}

	@Override
	public Order confirmedOrder(Long orderId) throws OrderException {
		Order order = findOrderById(orderId);
		order.setOrderStatus("CONFIRMED");
		return orderRepository.save(order);
	}

	@Override
	public Order shippedOrder(Long orderId) throws OrderException {
		Order order = findOrderById(orderId);
		order.setOrderStatus("SHIPPED");
		return orderRepository.save(order);
	}

	@Override
	public Order deliveredOrder(Long orderId) throws OrderException {
		Order order = findOrderById(orderId);
		order.setOrderStatus("DELIVERED");
		return orderRepository.save(order);
	}

	@Override
	public Order canceledOrder(Long orderId) throws OrderException {
		Order order = findOrderById(orderId);
		order.setOrderStatus("CANCELLED");
		return orderRepository.save(order);
	}

	@Override
	public List<Order> getAllOrders() {
		return orderRepository.findAll();
	}

	@Override
	public void deleteOrder(Long ordeId) throws OrderException {
		Order order = findOrderById(ordeId);
		orderRepository.deleteById(ordeId);
	}

	@Override
	public List<Order> getUserOrders(Long id) {
	   return orderRepository.findByUser_Id(id);
	}

}
