package com.team1.nbbanfare.controller;


import java.util.List;

import org.python.core.PyFunction;
import org.python.core.PyInteger;
import org.python.core.PyObject;
import org.python.util.PythonInterpreter;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.team1.nbbanfare.dto.ProductForm;
import com.team1.nbbanfare.dto.User;
import com.team1.nbbanfare.repository.ProductRepository;
import com.team1.nbbanfare.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
@Slf4j
@RestController
@RequiredArgsConstructor
public class SampleController {
	private final UserRepository userRepository;
	private static PythonInterpreter interpreter;


	@GetMapping("/rest1")
	public String rest1() {
		
		return "rest1";
	}
	
	@GetMapping("/pytest") //파이썬 연결
	public String pytest() {
		interpreter = new PythonInterpreter();
		interpreter.execfile("src/main/python/test.py");
		interpreter.exec("print(testFunc(5,10))");
		
		PyFunction pyFunction = interpreter.get("testFunc", PyFunction.class);
		
		int a = 10;
		int b = 20;
		
		PyObject pyobj = pyFunction.__call__(new PyInteger(a), new PyInteger(b));
		System.out.println(pyobj);
		
		return pyobj.toString();
	}
	
	
	@PostMapping("/join")
	public String register2(@ModelAttribute User userForm) {
		User idCheck =userRepository.selectByUserId(userForm.getUserId());
		log.info("userForm :{}", userForm);
		
		if(idCheck == null) {
			userRepository.insert(userForm);
		}else {
			return "0";
		}
			return "1";
		}
	
	

	
	@GetMapping("/{productKind}")
	public List<ProductForm> food(Model model, @PathVariable("productKind") String productKind) {
		System.out.println(productKind);
		
		List<ProductForm> item = productRepository.selectByKind(productKind);
		
		return item;
	}
	
	
}
