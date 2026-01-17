package com.buzzbuy.specification;

import java.util.List;

import org.springframework.data.jpa.domain.Specification;

import com.buzzbuy.model.Category;
import com.buzzbuy.model.Product;
import com.buzzbuy.model.Size;

import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;

public class ProductSpecification {

	public static Specification<Product> hasColors(List<String> colors) {
		return (root, query, cb) -> {
			if (colors == null || colors.isEmpty()) {
				return cb.conjunction();
			}

			query.distinct(true);

			return cb.or(
					colors.stream().map(c -> cb.like(cb.lower(root.get("color")), "%" + c.trim().toLowerCase() + "%"))
							.toArray(jakarta.persistence.criteria.Predicate[]::new));
		};
	}

	public static Specification<Product> hasSizes(List<String> sizes) {
		return (root, query, cb) -> {
			if (sizes == null || sizes.isEmpty()) {
				return cb.conjunction();
			}

			query.distinct(true);

			Join<Product, Size> sizeJoin = root.join("sizes", JoinType.LEFT);

			return sizeJoin.get("name").in(sizes);
		};
	}

	public static Specification<Product> priceBetween(Integer min, Integer max) {
	    return (root, query, cb) -> {

	        // ❗ ignore default / invalid ranges
	        if ((min == null || min <= 0) && (max == null || max <= 0)) {
	            return cb.conjunction();
	        }

	        if (min != null && min > 0 && max != null && max > 0) {
	            return cb.between(root.get("discountedPrice"), min, max);
	        }

	        if (min != null && min > 0) {
	            return cb.greaterThanOrEqualTo(root.get("discountedPrice"), min);
	        }

	        if (max != null && max > 0) {
	            return cb.lessThanOrEqualTo(root.get("discountedPrice"), max);
	        }

	        return cb.conjunction();
	    };
	}

	public static Specification<Product> minDiscount(Integer discount) {
	    return (root, query, cb) -> {
	        if (discount == null || discount <= 0) {
	            return cb.conjunction();
	        }
	        return cb.greaterThanOrEqualTo(
	            root.get("discountedPercent"),
	            discount
	        );
	    };
	}

	public static Specification<Product> stockFilter(String stock) {
		return (root, query, cb) -> {
			if (stock == null) { 
				return cb.conjunction(); 
				} if ("in_stock".equals(stock)) { 
					return cb.greaterThan(root.get("quantity"), 0);
					} if ("out_of_stock".equals(stock)) { 
						return cb.lessThan(root.get("quantity"), 1); 
						} return cb.conjunction(); };
	}

	public static Specification<Product> hasCategory(String category) {
	    return (root, query, cb) -> {
	        if (category == null || category.isBlank()) {
	            return cb.conjunction();
	        }

	        query.distinct(true);
	        String value = category.trim().toLowerCase();

	        Join<Product, Category> c = root.join("category", JoinType.LEFT);
	        Join<Category, Category> p1 = c.join("parentCategory", JoinType.LEFT);
	        Join<Category, Category> p2 = p1.join("parentCategory", JoinType.LEFT);

	        return cb.or(
	            cb.equal(cb.lower(c.get("name")), value),
	            cb.equal(cb.lower(p1.get("name")), value),
	            cb.equal(cb.lower(p2.get("name")), value)
	        );
	    };
	}

	
}
