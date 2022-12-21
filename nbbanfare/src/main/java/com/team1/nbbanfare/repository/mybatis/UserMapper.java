package com.team1.nbbanfare.repository.mybatis;

import org.apache.ibatis.annotations.Mapper;

import com.team1.nbbanfare.dto.UserForm;

@Mapper
public interface UserMapper {

	public Integer insert(UserForm user);
}
