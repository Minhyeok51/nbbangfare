package com.team1.nbbanfare.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.team1.nbbanfare.dto.ProductForm;
import com.team1.nbbanfare.repository.ProductRepository;
import com.team1.nbbanfare.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
public class ProductController {
	private final ProductRepository productRepository;

	
	@GetMapping("/")
	public List<ProductForm> ProductSearchAll(@ModelAttribute ProductForm productForm) {
		List<ProductForm> productList = productRepository.selectAll();
		
		return productList;
	}
	@GetMapping("/ItemDetail/{productNo}")
	public ProductForm productSearchId(@ModelAttribute ProductForm productForm, @PathVariable("productNo") int productNo) {
		ProductForm productPrintForm = productRepository.selectById(productNo);
		log.info("{}",productPrintForm);
		return productPrintForm;
	}	
}
