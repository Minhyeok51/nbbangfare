package com.team1.nbbanfare.controller;


import org.python.core.PyFunction;
import org.python.core.PyInteger;
import org.python.core.PyObject;
import org.python.util.PythonInterpreter;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SampleController {
	
	private static PythonInterpreter interpreter;
	
	@RequestMapping("/rest1")
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
}
