package com.team1.nbbanfare.repository;


import java.util.List;

import com.team1.nbbanfare.dto.User;



public interface UserRepository {
	public User insert(User user);
	
	public User insertKakaoUser(User user);
	
	public User selectByUserEmail(String userEmail);
	
	public List<User> searchUser(String word);
	
	public boolean updateUserPassword(String userEmail, String userName, String tempPassword);
	
	public boolean updateUserInfo(User user);
	
	public boolean updateUserActive(String userEmail);

//	public UserForm selectById(int id);

//	public UserForm selectByLoginId(String loginId);
	
//	public List<UserForm> selectAll();
	
//	public void deleteAll();
}
