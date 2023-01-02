package com.team1.nbbanfare.controller;

import java.util.HashMap;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.team1.nbbanfare.api.KakaoAPI;
import com.team1.nbbanfare.dto.User;
import com.team1.nbbanfare.form.LoginForm;
import com.team1.nbbanfare.service.EmailService;
import com.team1.nbbanfare.service.LoginService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequiredArgsConstructor
public class LoginController {

	private final LoginService loginService;
	private final EmailService emailService;
	private String accessToken;
	
	
	@PostMapping("/login")
	@ResponseBody
	public User doLogin(@ModelAttribute LoginForm loginForm) {
		log.info("로그인폼 : {}",loginForm.getUserPassword());
		User user = loginService.login(loginForm.getUserId(), loginForm.getUserPassword());
		
		if(user == null) { //계정정보가 없거나, 비밀번호가 안맞거나 로그인 실패
			log.info("안됨");
	 		return null;
	 	}
		log.info("db에서넘어온 user{}",user);
		return user;
	}
	
	KakaoAPI kakaoApi = new KakaoAPI();
	@GetMapping("/oauth/kakao")
	@ResponseBody
	public HashMap<String, Object> accessToken(@RequestParam("code") String code) {
		log.info("엑세스코드 = {}", code);
		this.accessToken = kakaoApi.getAccessToken(code);
		
		HashMap<String, Object> userInfo = kakaoApi.getUserInfo(accessToken);
		log.info("세션값 : {}", accessToken);
		return userInfo;
	}
	
	@PostMapping("/kakaoLogout")
	@ResponseBody
	public String logout() {
		
		kakaoApi.kakaoLogout(this.accessToken);
		log.info("카카오 로그아웃 성공");
		return "카카오 로그아웃 성공";
				
	}
	@PostMapping("/emailConfirm")
	@ResponseBody
	public String emailConfirm(@RequestParam("email") String email) throws Exception {

	  String confirm = emailService.sendSimpleMessage(email);

	  return confirm;
	}
}
