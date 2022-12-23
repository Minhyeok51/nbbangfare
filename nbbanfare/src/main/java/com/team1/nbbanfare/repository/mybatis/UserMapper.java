package com.team1.nbbanfare.repository.mybatis;

import org.apache.ibatis.annotations.Mapper;

import com.team1.nbbanfare.dto.User;

@Mapper
public interface UserMapper {

	public Integer insert(User user);
	
	public User selectByUserId(String userId);
}
