package com.team1.nbbanfare.repository;

import com.team1.nbbanfare.dto.FollowerForm;


public interface FollowerRepository {
	public void insertFollower(FollowerForm followerForm);
	
	public FollowerForm selectFollowerById(FollowerForm followerForm);
	
	public void deleteFollowerById(FollowerForm followerForm);
}
