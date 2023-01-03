//package com.team1.nbbanfare.repository;
//
//import java.util.ArrayList;
//import java.util.List;
//
//import org.springframework.stereotype.Repository;
//
//import com.team1.nbbanfare.dto.User;
//import com.team1.nbbanfare.repository.mybatis.ProductMapper;
//import com.team1.nbbanfare.repository.mybatis.UserMapper;
//
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//@Slf4j
//@Repository
//@RequiredArgsConstructor
//public class UserFormRepository implements UserRepository{
//	private static List<User> db = new ArrayList<>();
//	private static int seq = 1;
//	private final UserMapper userMapper;
//	
//
//	
//	@Override
//	public User insert(User user) {
//		user.setUserNo(seq++);
//		db.add(user);
//		return user;
//	}
//
//	@Override
//	public User selectByUserEmail(String userEmail) {
//		for(User user : db) {
//			if(user.getUserEmail().equals(userEmail)) {
//				return user;
//			}
//		}
//		return null;
//	}
//	
//	@Override 
//	public List<User> searchUser(String word) {
//		List<User> searchUserList = userMapper.searchUser(word);
//		return searchUserList;
//	}
//
//}
