package com.team1.nbbanfare.repository.mybatis;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.team1.nbbanfare.dto.User;

@Mapper
public interface UserMapper {

	public Integer insert(User user);
	
	public Integer insertKakaoUser(User user);
	
	public User selectByUserEmail(String userEmail);
	
	public List<User> searchUser(String word);
	
	public void updateUserPassword(@Param("userEmail") String userEmail
			,@Param("userName") String userName
			,@Param("userPassword") String userPassword);
	
	public void updateUserInfo( User user); 
	
	public void updateUserActive(String userEmail);
	
	public void uploadUserImage(User user);
	
	}
