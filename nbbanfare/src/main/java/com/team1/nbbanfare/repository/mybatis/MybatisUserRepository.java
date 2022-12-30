package com.team1.nbbanfare.repository.mybatis;

import java.util.List;

import org.python.jline.internal.Log;
import org.springframework.stereotype.Repository;

import com.team1.nbbanfare.dto.User;
import com.team1.nbbanfare.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
@Slf4j
@Repository
@RequiredArgsConstructor
public class MybatisUserRepository implements UserRepository{

	private final UserMapper userMapper;

	@Override
	public User insert(User user) {

		userMapper.insert(user);
		return user ;
	}
	@Override
	public User selectByUserId(String userId) {
		log.info(userId);
		User user = userMapper.selectByUserId(userId);
		log.info("유저 안담기냐 왜 {}", user);
		return user;
	}
	
	@Override
	public List<User> searchUser(String word) {
		List<User> searchUserList = userMapper.searchUser(word);
		return searchUserList;
		
	}
	

}
