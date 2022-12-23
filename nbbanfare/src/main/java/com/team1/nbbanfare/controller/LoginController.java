package com.team1.nbbanfare.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.team1.nbbanfare.dto.User;
import com.team1.nbbanfare.form.LoginForm;
import com.team1.nbbanfare.service.LoginService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
@Slf4j
@Controller
@RequiredArgsConstructor
public class LoginController {

	private final LoginService loginService;
	
	@PostMapping("/login")
	@ResponseBody
	public User doLogin(@ModelAttribute LoginForm loginForm) {
		log.info("로그인폼 : {}",loginForm);
		User user = loginService.login(loginForm.getUserId(), loginForm.getUserPw());
		
		if(user == null) { //계정정보가 없거나, 비밀번호가 안맞거나 로그인 실패
			log.info("안됨");
	 		return null;
	 	}
		return user;
	}
}
