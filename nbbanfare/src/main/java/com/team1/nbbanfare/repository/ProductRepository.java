package com.team1.nbbanfare.repository;

import java.util.ArrayList;
import java.util.List;

import com.team1.nbbanfare.dto.ProductForm;

public interface ProductRepository {
	public List<ProductForm> selectAll();
	
	public ProductForm selectById(int productNo); 
	
	public List<ProductForm> selectById();

	public List<ProductForm> selectByKind(String productKind);
	
	public void insertProduct(ProductForm product);
	
	public void mergeProduct();
	
	public void deleteAll();
}
