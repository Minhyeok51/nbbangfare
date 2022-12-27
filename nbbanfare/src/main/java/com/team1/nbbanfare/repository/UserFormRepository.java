package com.team1.nbbanfare.repository;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.team1.nbbanfare.dto.User;

import lombok.extern.slf4j.Slf4j;
@Slf4j
@Repository
public class UserFormRepository implements UserRepository{
	private static List<User> db = new ArrayList<>();
	private static int seq = 1;
	@Override
	public User insert(User user) {
		user.setUserNo(seq++);
		db.add(user);
		return user;
	}

	@Override
	public User selectByUserId(String userId) {
		for(User user : db) {
			if(user.getUserId().equals(userId)) {
				return user;
			}
		}
		return null;
	}
}
