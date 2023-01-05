package com.team1.nbbanfare.repository;

import java.util.List;

import com.team1.nbbanfare.dto.FollowerForm;


public interface FollowerRepository {
	
	public void insertFollower(FollowerForm followerForm);
	
	public FollowerForm selectFollowerById(FollowerForm followerForm);
	
	public void deleteFollowerById(FollowerForm followerForm);
	
	public List<FollowerForm> selectFollower(String userId);
}
