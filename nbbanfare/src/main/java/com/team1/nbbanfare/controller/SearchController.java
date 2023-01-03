package com.team1.nbbanfare.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.team1.nbbanfare.dto.ProductForm;
import com.team1.nbbanfare.dto.User;
import com.team1.nbbanfare.repository.ProductRepository;
import com.team1.nbbanfare.repository.mybatis.MybatisUserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
public class SearchController {
	@Autowired
	private MybatisUserRepository mybatisUserRepository;
	
	@GetMapping("/Search/{word}")
	public List<User> userSearchName(@PathVariable("word") String word) {
		List<User> userSearchList = mybatisUserRepository.searchUser(word);
		log.info("search controller{}",userSearchList);
		return userSearchList;
	}	
}
