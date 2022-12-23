package com.team1.nbbanfare.service;

import org.springframework.stereotype.Service;

import com.team1.nbbanfare.dto.User;
import com.team1.nbbanfare.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class LoginService {

	private final UserRepository userRepository;
	
	public User login(String userId, String userPw) {
		
		User user = userRepository.selectByUserId(userId);
		user.setUserPw(userPw);
		if(user != null) {
		
			if(user.getUserPw().equals(userPw)) {
				return user;
			}
		}
		
		return null;
	}
}
