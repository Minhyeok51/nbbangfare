package com.team1.nbbanfare.repository.mybatis;

import org.apache.ibatis.annotations.Mapper;

import com.team1.nbbanfare.dto.FollowerForm;

@Mapper
public interface FollowerMapper {
	public void insertFollower(FollowerForm followerForm);
}
