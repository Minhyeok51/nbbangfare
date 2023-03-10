package com.team1.nbbanfare.controller;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.UUID;

import org.python.antlr.runtime.Parser;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

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
	
	@PostMapping("/join")
	@ResponseBody
	public String register2(@ModelAttribute User userForm) {
		User idCheck =userRepository.selectByUserEmail(userForm.getUserEmail());
//		log.info("userForm :{}", userForm);
		
		if(idCheck == null) {
			userRepository.insert(userForm);
		}else {
			return "0";
		}
			return "1";
		}
	
	@PostMapping("/joinWithKakao")
	@ResponseBody
	public String kakaoJoin(@ModelAttribute User userForm) {
		User idCheck =userRepository.selectByUserEmail(userForm.getUserEmail());
//		log.info("userForm :{}", userForm);
		
		if(idCheck == null) {
			userRepository.insertKakaoUser(userForm);
		}else {
			return "0";
		}
			return "1";
		}
	
	@PostMapping("/login")
	@ResponseBody
	public User doLogin(@ModelAttribute LoginForm loginForm) {
		log.info("???????????? : {}",loginForm.getUserPassword());
		User user = loginService.login(loginForm.getUserEmail(), loginForm.getUserPassword());
		
		if(user == null) { //??????????????? ?????????, ??????????????? ???????????? ????????? ??????, ???????????????
			log.info("??????");
	 		return null;
	 	}
		log.info("db??????????????? user{}",user);
		return user;
	}
	
	
	@GetMapping("/oauth/kakao")
	@ResponseBody
	public HashMap<String, Object> accessToken(@RequestParam("code") String code) {
		log.info("??????????????? = {}", code);
		this.accessToken = kakaoApi.getAccessToken(code);
		
		HashMap<String, Object> userInfo = kakaoApi.getUserInfo(accessToken);
		User kakaoUser = new User();
		kakaoUser.setUserName(userInfo.get("nickname").toString());
		kakaoUser.setUserEmail(userInfo.get("email").toString());
		kakaoUser.setUserImage(userInfo.get("image").toString());
		if(userRepository.selectByUserEmail(userInfo.get("email").toString()) == null) {
//			userRepository.insertKakaoUser(kakaoUser); ?????????????????????
			HashMap<String, Object> newKakaoUserMap = new HashMap<String, Object>();
			newKakaoUserMap.put("newKakaoUser", "iAmNew");
			newKakaoUserMap.put("basicInfo", kakaoUser);
			return newKakaoUserMap;
		}else {
			User ourKakaoUser = userRepository.selectByUserEmail(userInfo.get("email").toString());
			HashMap<String, Object> ourKakaoUserMap = new HashMap<String, Object>();
			ourKakaoUserMap.put("kakaoUser", ourKakaoUser);
			return ourKakaoUserMap;
		}
	}
	
	@PostMapping("/kakaoLogout")
	@ResponseBody
	public String logout() {
		
		kakaoApi.kakaoLogout(this.accessToken);
		log.info("????????? ???????????? ??????");
		return "????????? ???????????? ??????";
				
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
		log.info("???????????? : {}  {} ",loginForm.getUserEmail(), loginForm.getUserName());
		User user = loginService.findPw(loginForm.getUserEmail(), loginForm.getUserName());
		if(user == null) { //??????????????? ?????????, ??????????????? ???????????? ????????? ??????
			log.info("????????????");
	 		return null;
	 	}
		log.info("db??????????????? user{}",user);
//		emailService = new EmailTempPassword();
		String tempPassword = emailService.sendSimpleMessage(user.getUserEmail());
		user.setUserPassword(tempPassword);
		log.info("?????????????????? user{}",tempPassword);
		log.info("user????????? :{}, ??????:{} , ??????:{}", user.getUserEmail(),user.getUserName(),user.getUserPassword());
		boolean result = userRepository.updateUserPassword(user.getUserEmail(), user.getUserName(),user.getUserPassword());
		log.info("??????user {} ??????{} ",result);
		return user;
	}
	
	@GetMapping("/updateUserInfo/{userEmail}")
	@ResponseBody
	public User updateUserInfo(@PathVariable String userEmail) {
		log.info("???????????????user {} ",userEmail);
		User user = userRepository.selectByUserEmail(userEmail);
		return user;
	}
	@PostMapping("/updateUserInfo/{userEmail}")
	@ResponseBody
	public boolean updateUser(@ModelAttribute User user,@PathVariable String userEmail) {
		log.info("?????????user {} ",user);
		log.info("???????????? ????????? {} ",userEmail);
		boolean result = false;
		result = userRepository.updateUserInfo( user);
		return result;
	}
	
	@PostMapping("/deleteUser/{userEmail}")
	@ResponseBody
	public boolean deleteUser(@PathVariable String userEmail, @RequestParam("a") String a) {
		System.out.println(a);
		System.out.println(userEmail);
		boolean result = false;
		result = userRepository.updateUserActive(userEmail);
		
		return result;
	}
	@PostMapping("/image")
	@ResponseBody
	public User upload(@RequestParam(value="fileOne",required = false)  MultipartFile file,
			@RequestParam("userEmail") String userEmail) {
		System.out.println("?????? ????????? " + file);
		System.out.println("??????contentType :" + file.getContentType());
		System.out.println("??????originalFileNmae :" + file.getOriginalFilename());
		System.out.println("??????name :" + file.getName());
		System.out.println("??????size :" + file.getSize());
		System.out.println("???????????????: "+userEmail);
		
		try {
			String realFileName = UUID.randomUUID().toString();
			String fileExt =  file.getOriginalFilename().substring(file.getOriginalFilename().indexOf(".")+1);
			String changedFileName =realFileName+"."+fileExt;
			String reactPath = "/images/"+changedFileName;
			String filePath ="C:\\Users\\User\\git\\nbbangfare\\nbbanfare\\src\\main\\frontend\\public\\images\\"+changedFileName;
			file.transferTo(new File(filePath));
			User user = userRepository.selectByUserEmail(userEmail);
			user.setUserImage(reactPath);
			userRepository.uploadUserImage(user);
			return user;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
}
