package com.team1.nbbanfare.controller;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
//import org.json.simple.JSONArray;
//import org.json.simple.JSONObject;
//import org.json.simple.parser.JSONParser;
//import org.json.simple.parser.ParseException;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.team1.nbbanfare.dto.ProductForm;
import com.team1.nbbanfare.repository.ProductRepository;
import com.team1.nbbanfare.repository.UserRepository;

import jakarta.annotation.PostConstruct;
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
	
					  //초 분 시 일 월 요일
//	@Scheduled(cron = "0 33 15 * * *" , zone = "Asia/Seoul")
	public void insertInit() throws IOException, ParseException {
		ArrayList<ProductForm> array = null;
		JSONParser parser = new JSONParser();
		FileReader reader = new FileReader("C:\\Users\\kwon\\git\\nbbangfare\\nbbanfare\\src\\main\\python\\test.json");
		
		array = new ArrayList<ProductForm>();  
		
		JSONArray jsonArray = (JSONArray)parser.parse(reader);

		for(int i=0; i<jsonArray.size(); i++) {
			JSONObject jsonObject = (JSONObject)jsonArray.get(i);
			String productName = (String)jsonObject.get("productName");
			String productPrice = (String)jsonObject.get("productPrice");
			String productImage = (String)jsonObject.get("productImage");
			String productKind = (String)jsonObject.get("productKind");
			String productContent = (String)jsonObject.get("productContent");
			ProductForm product = new ProductForm();
			product.setProductName(productName);
			product.setProductPrice(productPrice);
			product.setProductImage(productImage);
			product.setProductKind(productKind);
			product.setProductContent(productContent);
			array.add(product);
		}
		System.out.println(array);
		
		//크롤링 상태 -> 일자, 결과
		// 12/28 , 완료
		productRepository.deleteAll();
		//select 12/28 완료된게 있나?
		
		//없으면
		for(ProductForm product : array) {
			productRepository.insertProduct(product);
		}
		productRepository.mergeProduct();
		
		//있으면 패스
		
		
	}
	
//	@GetMapping("/search")
//	public void getSearchProducts(@RequestParam(value="search") String search) {
//			try {
//				List<GetProductRes> getProductResList = productService.getSearchProducts(word);
//				return new BaseResponse<>(getProductResList);
//			} catch (Exception exception) {
//				return new BaseResponse<>(BaseResponseStatus.FAIL);
//			}
//		}
//		
	

	
}
