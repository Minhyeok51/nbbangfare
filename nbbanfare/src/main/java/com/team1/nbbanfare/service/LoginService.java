package com.team1.nbbanfare.service;

import org.springframework.stereotype.Service;

import com.team1.nbbanfare.dto.User;
import com.team1.nbbanfare.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class LoginService {

	private final UserRepository userRepository;
	
	public User login(String userEmail, String userPw) {
		log.info("아이디 비번 나와라 {} {}",userEmail,userPw);
		User user = userRepository.selectByUserEmail(userEmail);
//		log.info("유저 안담김? {} ", user);
		if(user != null) {

			if(user.getUserPassword().equals(userPw)) {
				return user;
			}
		}

		return null;
	}
	
	public User findPw(String userEmail, String userName) {
		log.info("아이디 비번 나와라2 {} {}",userEmail,userName);
		User user = userRepository.selectByUserEmail(userEmail);
//		log.info("유저 안담김? {} ", user);
		if(user != null) {

			if(user.getUserName().equals(userName)) {
				return user;
			}
		}
		return null;
	}
}
