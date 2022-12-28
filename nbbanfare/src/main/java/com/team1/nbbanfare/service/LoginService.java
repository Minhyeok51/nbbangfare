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
	
	public User login(String userId, String userPw) {
		
		User user = userRepository.selectByUserId(userId);
//		user.setUserPassword(userPw);
		if(user != null) {
			log.info("3번째 {}", user);
			if(user.getUserPassword().equals(userPw)) {
				log.info("1번째 {}",user);
				return user;
			}
		}
		log.info("2번째 {}",user);
		return null;
	}
}
