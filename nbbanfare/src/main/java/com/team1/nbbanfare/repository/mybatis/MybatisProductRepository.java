//package com.team1.nbbanfare.repository.mybatis;
//
//import java.util.List;
//
//import org.python.jline.internal.Log;
//import org.springframework.stereotype.Repository;
//import org.springframework.transaction.annotation.Transactional;
//
//import com.team1.nbbanfare.dto.ProductForm;
//import com.team1.nbbanfare.repository.ProductRepository;
//
//import com.team1.nbbanfare.repository.UserRepository;
//import lombok.RequiredArgsConstructor;
//
//import lombok.extern.slf4j.Slf4j;
//
//@Slf4j
//@Repository
//@RequiredArgsConstructor
//public class MybatisProductRepository implements ProductRepository{
//	private final ProductMapper productMapper;
//	
//	@Override
//	public List<ProductForm> selectAll() {
//		List<ProductForm> productForms = null;
//		try {
//			productForms = productMapper.selectAll();
//		} catch (Exception e) {
//			Log.error(e.getMessage());
//		}
//		return productForms;
//	}
//}
