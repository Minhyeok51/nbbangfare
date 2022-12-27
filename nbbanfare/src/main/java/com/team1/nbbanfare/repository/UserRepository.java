package com.team1.nbbanfare.repository;


import com.team1.nbbanfare.dto.User;


public interface UserRepository {
	public User insert(User user);
	
	public User selectByUserId(String userId);
	

//	public UserForm selectById(int id);

//	public UserForm selectByLoginId(String loginId);
	
//	public List<UserForm> selectAll();
	
//	public void deleteAll();
}
