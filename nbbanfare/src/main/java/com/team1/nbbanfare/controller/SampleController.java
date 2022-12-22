package com.team1.nbbanfare.controller;


import org.python.core.PyFunction;
import org.python.core.PyInteger;
import org.python.core.PyObject;
import org.python.util.PythonInterpreter;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.team1.nbbanfare.dto.UserForm;
import com.team1.nbbanfare.repository.UserRepository;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
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
	public String register2(@ModelAttribute UserForm userForm) {
		
		log.info("userForm :{}", userForm);
		userRepository.insert(userForm);
		 return "http://localhost:3000/join";
	}
}
