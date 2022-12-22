package com.team1.nbbanfare.repository;

import java.util.List;

import com.team1.nbbanfare.dto.ProductForm;

public interface ProductRepository {
	public List<ProductForm> selectAll();
}
