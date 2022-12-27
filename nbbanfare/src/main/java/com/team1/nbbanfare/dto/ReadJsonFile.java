package com.team1.nbbanfare.dto;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

public class ReadJsonFile {
	public static void main(String[] args) throws IOException, ParseException  {
		ArrayList<ProductForm> array = null;
		JSONParser parser = new JSONParser();
		
		FileReader reader = new FileReader("C:\\Users\\User\\git\\nbbangfare\\nbbanfare\\src\\main\\test.json");
		
//		BufferedReader reader = new BufferedReader(
//			    new InputStreamReader(new FileInputStream("C:\\Users\\User\\git\\nbbangfare\\nbbanfare\\src\\main\\test.json"), StandardCharsets.UTF_8)
//			);
//		
//		StringBuilder sb = new StringBuilder();
		
//		String temp;
//		while((temp = reader.readLine()) != null) {
//			sb.append(temp);
//		}
		
		array = new ArrayList<ProductForm>();  
//		System.out.println(sb.toString());
//		JSONArray jsonArray = (JSONArray)parser.parse(str);
//		JSONArray jsonArray = (JSONArray)parser.parse(sb.toString());
		
		JSONArray jsonArray = (JSONArray)parser.parse(reader);
//		JSONArray jsonArray = (JSONArray) obj;
		for(int i=0; i<jsonArray.size(); i++) {
			JSONObject jsonObject = (JSONObject)jsonArray.get(i);
			String productName = (String)jsonObject.get("productName");
			String productPrice = (String)jsonObject.get("productPrice");
			String productImage = (String)jsonObject.get("productImage");
			String productKind = (String)jsonObject.get("productKind");
			ProductForm product = new ProductForm();
			product.setProductName(productName);
			product.setProductPrice(productPrice);
			product.setProductImage(productImage);
			product.setProductKind(productKind);
			array.add(product);

//		System.out.println(array);
		
		
		}
		System.out.println(array);
	}
}
