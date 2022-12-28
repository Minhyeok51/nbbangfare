package com.team1.nbbanfare.repository.mybatis;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

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
	@Transactional
	public User insert(User user) {

		userMapper.insert(user);
		return user ;
	}
	@Override
	public User selectByUserId(String userId) {

		User user = userMapper.selectByUserId(userId);
		log.info("mapper {}", user);
		
		return user;
	}
	

}
