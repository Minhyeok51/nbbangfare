package com.team1.nbbanfare.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import com.siot.IamportRestClient.exception.IamportResponseException;
import com.team1.nbbanfare.dto.FollowerForm;
import com.team1.nbbanfare.dto.FundingForm;
import com.team1.nbbanfare.dto.PresentForm;
import com.team1.nbbanfare.dto.User;
import com.team1.nbbanfare.repository.FollowerRepository;
import com.team1.nbbanfare.repository.FundingRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
public class FollowerController {
	private final FollowerRepository followerRepository;
	
	@PostMapping("/Search/{word}")
	public FollowerForm addFollower(@ModelAttribute FollowerForm follower, @PathVariable("word") String word) {
		log.info("follower			{}",follower);
		FollowerForm followerForm = followerRepository.selectFollowerById(follower);
		
		if(followerForm == null) {
			followerRepository.insertFollower(follower);
			log.info("들어왔다");
			log.info("{}",followerForm);
			return followerForm;
		} else {
			log.info("안들어옴");
			return followerForm;
		}
		
		
	}	
	
	@PutMapping("/Search/{word}")
	public void deleteFollower(@ModelAttribute FollowerForm follower, @PathVariable("word") String word) {
		log.info("{}", follower);
		followerRepository.deleteFollowerById(follower);
		log.info("삭제됨");
	}
	
	
}
