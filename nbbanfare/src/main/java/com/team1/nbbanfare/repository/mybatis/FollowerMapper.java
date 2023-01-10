package com.team1.nbbanfare.repository.mybatis;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.team1.nbbanfare.dto.FollowerForSearch;
import com.team1.nbbanfare.dto.FollowerForm;

@Mapper
public interface FollowerMapper {
	public void insertFollower(FollowerForm followerForm);
	
	public FollowerForm selectFollowerById(FollowerForm followerForm);
	
	public void deleteFollowerById(FollowerForm followerForm);
	
	public List<FollowerForm> selectFriend (String userNo);
	
	public List<String> selectFollower(String userId);
}
