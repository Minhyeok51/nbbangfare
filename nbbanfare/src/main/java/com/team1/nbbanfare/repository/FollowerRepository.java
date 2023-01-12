package com.team1.nbbanfare.repository;

import java.util.List;

import com.team1.nbbanfare.dto.FollowerForSearch;
import com.team1.nbbanfare.dto.FollowerForm;
import com.team1.nbbanfare.dto.PresentForm;


public interface FollowerRepository {
	
	public void insertFollower(FollowerForm followerForm);
	
	public FollowerForm selectFollowerById(FollowerForm followerForm);
	
	public void deleteFollowerById(FollowerForm followerForm);
	
	public List<FollowerForm> selectFriend (String userNo);
	
	public List<String> selectFollower(String userId);
	
	public List<PresentForm> selectFriendName(PresentForm presentForm);
}
