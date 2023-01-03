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
import com.team1.nbbanfare.repository.UserRepository;
import com.team1.nbbanfare.service.EmailService;
import com.team1.nbbanfare.service.EmailTempPassword;
import com.team1.nbbanfare.service.LoginService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequiredArgsConstructor
public class LoginController {

	private final LoginService loginService;
	private final EmailService emailService;
	private final UserRepository userRepository;
	KakaoAPI kakaoApi = new KakaoAPI();
	private String accessToken;
	
	@PostMapping("/login")
	@ResponseBody
	public User doLogin(@ModelAttribute LoginForm loginForm) {
		log.info("로그인폼 : {}",loginForm.getUserPassword());
		User user = loginService.login(loginForm.getUserEmail(), loginForm.getUserPassword());
		
		if(user == null) { //계정정보가 없거나, 비밀번호가 안맞거나 로그인 실패
			log.info("안됨");
	 		return null;
	 	}
		log.info("db에서넘어온 user{}",user);
		return user;
	}
	
	
	@GetMapping("/oauth/kakao")
	@ResponseBody
	public HashMap<String, Object> accessToken(@RequestParam("code") String code) {
		log.info("엑세스코드 = {}", code);
		this.accessToken = kakaoApi.getAccessToken(code);
		
		HashMap<String, Object> userInfo = kakaoApi.getUserInfo(accessToken);
		User kakaoUser = new User();
		kakaoUser.setUserNo(userInfo.get("id").toString());
		kakaoUser.setUserName(userInfo.get("nickname").toString());
		kakaoUser.setUserEmail(userInfo.get("email").toString());
		kakaoUser.setUserImage(userInfo.get("image").toString());
		if(userRepository.selectByUserEmail(userInfo.get("email").toString()) == null) {
//			userRepository.insert(kakaoUser);
			HashMap<String, Object> newKakaoUser = new HashMap<String, Object>();
			newKakaoUser.put("newKakaoUser", "iAmNew");
			newKakaoUser.put("basicInfo", kakaoUser);
			return newKakaoUser;
		}
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
		User user = userRepository.selectByUserEmail(email);
		if(user != null) {
			return "1"; 
		}
	  String confirm = emailService.sendSimpleMessage(email);

	  return confirm;
	}
	
	@PostMapping("/forgotPassword")
	@ResponseBody
	public User forgotPassword(@ModelAttribute LoginForm loginForm) throws Exception {
		log.info("로그인폼 : {}  {} ",loginForm.getUserEmail(), loginForm.getUserName());
		User user = loginService.findPw(loginForm.getUserEmail(), loginForm.getUserName());
		if(user == null) { //계정정보가 없거나, 비밀번호가 안맞거나 로그인 실패
			log.info("계정없음");
	 		return null;
	 	}
		log.info("db에서넘어온 user{}",user);
//		emailService = new EmailTempPassword();
		String tempPassword = emailService.sendSimpleMessage(user.getUserEmail());
		user.setUserPassword(tempPassword);
		log.info("임시비밀번호 user{}",tempPassword);
		log.info("user이메일 :{}, 이름:{} , 비번:{}", user.getUserEmail(),user.getUserName(),user.getUserPassword());
		boolean result = userRepository.updateUserPassword(user.getUserEmail(), user.getUserName(),user.getUserPassword());
		log.info("바뀐user {} 결과{} ",result);
		return user;
	}
}
