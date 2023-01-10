package com.team1.nbbanfare.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.team1.nbbanfare.dto.FollowerForSearch;
import com.team1.nbbanfare.dto.FollowerForm;
import com.team1.nbbanfare.dto.User;
import com.team1.nbbanfare.repository.FollowerRepository;
import com.team1.nbbanfare.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
public class SearchController {
	
	
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private FollowerRepository followerRepository;
	
	@GetMapping("/Search/{word}")
	public List<User> userSearchName(@PathVariable("word") String word) {
		
		
	
		List<User> userSearchList = userRepository.searchUser(word);
		return userSearchList;
	}	
	
	@GetMapping("/Search/{word}/{user_id}")
	public List<String> follow(@PathVariable("user_id") String user_id) {
		
		System.out.println("**************"+user_id);
		
		FollowerForm followerForm = new FollowerForm();
		followerForm.setUserId(user_id);
		System.out.println("팔로워폼" + followerForm.getUserId());
//		one@asd.com
		List<String> followerList = followerRepository.selectFollower(followerForm.getUserId());
		System.out.println(followerList);
		log.info("{}", followerList);
		return followerList;
	}	
}
