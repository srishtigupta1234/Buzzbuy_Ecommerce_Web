package com.buzzbuy.service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.buzzbuy.model.Category;
import com.buzzbuy.exception.ProductException;
import com.buzzbuy.model.Product;
import com.buzzbuy.model.Size;
import com.buzzbuy.repository.CartItemRepository;
import com.buzzbuy.repository.CategoryRepository;
import com.buzzbuy.repository.ProductRepository;
import com.buzzbuy.request.CreateProductRequest;
import com.buzzbuy.request.UpdateProductRequest;
import com.buzzbuy.specification.ProductSpecification;



@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private CategoryRepository categoryRepository;
    
    @Autowired
    private CartItemRepository cartItemRepository;

   
    @Override
    public Product createProduct(CreateProductRequest req) {

    	System.out.println("CATEGORY RECEIVED = " + req.getTopLevelCategory() + req.getSecondLevelCategory() + req.getThirdLevelCategory());

    	Category topLevel = categoryRepository.findByNameAndParentCategoryIsNull(req.getTopLevelCategory());
    	
   
        if (topLevel == null) {
            Category topLevelCategory = new Category();
            topLevelCategory.setName(req.getTopLevelCategory());
            topLevelCategory.setLevel(1);
            topLevel = categoryRepository.save(topLevelCategory);
        }

        Category secondLevel = categoryRepository.findByNameAndParent(
        	    req.getSecondLevelCategory(), topLevel.getName());
        if (secondLevel == null) {
            Category secondLevelCategory = new Category();
            secondLevelCategory.setName(req.getSecondLevelCategory());
            secondLevelCategory.setLevel(2);
            secondLevelCategory.setParentCategory(topLevel);
            secondLevel = categoryRepository.save(secondLevelCategory);
        }

        Category thirdLevel = categoryRepository.findByNameAndParent(
        	    req.getThirdLevelCategory(), secondLevel.getName()
        	);

        	if (thirdLevel == null) {
        	    Category thirdLevelCategory = new Category();
        	    thirdLevelCategory.setName(req.getThirdLevelCategory());
        	    thirdLevelCategory.setParentCategory(secondLevel);
        	    thirdLevelCategory.setLevel(3);
        	    thirdLevel = categoryRepository.save(thirdLevelCategory);
        	}

        Product product = new Product();
        product.setTitle(req.getTitle());
        product.setColor(req.getColor());
        product.setCreatedAt(LocalDateTime.now());
        product.setDescription(req.getDescription());
        product.setDiscountedPercent(req.getDiscountedPercent());
        product.setDiscountedPrice(req.getDiscountedPrice());
        product.setImageUrl(req.getImageUrl());
        product.setBrand(req.getBrand());
        product.setQuantity(req.getQuantity());
        product.setCategory(thirdLevel);
        product.setPrice(req.getPrice());
        product.setSizes(req.getSize());
        
        return productRepository.save(product);
    }

    
    @Override
    public String deleteProduct(Long productId) throws ProductException {
    	Product product = findProductById(productId);
        product.getSizes().clear();
        cartItemRepository.deleteByProductId(productId);
        productRepository.delete(product);
        return "Product deleted successfully";
    }

    @Override
    public Product updateProduct(Long productId, UpdateProductRequest product) throws ProductException {
        Product existing = findProductById(productId);
        existing.setQuantity(product.getQuantity());
        existing.setPrice(product.getPrice());
        existing.setDiscountedPrice(product.getDiscountedPrice());
        existing.setDiscountedPercent(product.getDiscountedPercent());
        existing.setColor(product.getColor());
        existing.setBrand(product.getBrand());
        existing.setDescription(product.getDescription());
        return productRepository.save(existing);
    }

   
    @Override
    public Product findProductById(Long productId) throws ProductException {
    	System.out.println("Product ID received: " + productId);
    	    if (productId == null) {
    	        throw new ProductException("Product ID must not be null");
    	    }

    	    return productRepository.findById(productId)
    	            .orElseThrow(() -> new ProductException("Product not found with id: " + productId));
    	}

    

    @Override
    public List<Product> findProductByCategory(String category) {
        return productRepository.findAll().stream()
                .filter(p -> p.getCategory().getName().equalsIgnoreCase(category))
                .collect(Collectors.toList());
    }
    @Override
    public Page<Product> getAllProduct(
            String category, List<String> colors, List<String> sizes,
            Integer minPrice, Integer maxPrice, Integer minDiscount,
            String sort, String stock, Integer pageNumber, Integer pageSize) {


        Sort sorting = switch (sort) {
            case "price_low" -> Sort.by("discountedPrice").ascending();
            case "price_high" -> Sort.by("discountedPrice").descending();
            case "newest" -> Sort.by("createdAt").descending();
            default -> Sort.unsorted();
        };

        Pageable pageable = PageRequest.of(pageNumber, pageSize, sorting);

        Specification<Product> spec = Specification
                .where(ProductSpecification.hasCategory(category))
                .and(ProductSpecification.hasColors(colors))
                .and(ProductSpecification.hasSizes(sizes))
                .and(ProductSpecification.priceBetween(minPrice, maxPrice))
                .and(ProductSpecification.minDiscount(minDiscount))
                .and(ProductSpecification.stockFilter(stock));

        return productRepository.findAll(spec, pageable);
    }

}
