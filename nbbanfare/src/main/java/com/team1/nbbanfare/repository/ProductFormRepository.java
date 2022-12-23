package com.team1.nbbanfare.repository;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.team1.nbbanfare.dto.ProductForm;
import com.team1.nbbanfare.repository.mybatis.ProductMapper;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ProductFormRepository implements ProductRepository {

		private static List<ProductForm> db = new ArrayList<>();
		private final ProductMapper productMapper;
		
		@Override
		@Transactional
		public List<ProductForm> selectAll() {
			List<ProductForm> productform= productMapper.selectAll();
			return productform;
		}
		
		@Override
		@Transactional
		public ProductForm selectById(int productNo) {
			ProductForm productForm = productMapper.selectById(productNo);
			return productForm;
		}


	
		

	
}
