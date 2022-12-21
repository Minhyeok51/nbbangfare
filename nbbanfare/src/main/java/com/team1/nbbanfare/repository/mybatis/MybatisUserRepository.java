package com.team1.nbbanfare.repository.mybatis;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.team1.nbbanfare.dto.UserForm;
import com.team1.nbbanfare.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class MybatisUserRepository implements UserRepository{

	private final UserMapper userMapper;
	@Override
	@Transactional
	public UserForm insert(UserForm user) {

		userMapper.insert(user);
		return user ;
	}

}
