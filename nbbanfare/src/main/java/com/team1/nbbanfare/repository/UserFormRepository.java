package com.team1.nbbanfare.repository;

import org.springframework.stereotype.Repository;

import com.team1.nbbanfare.dto.UserForm;
@Repository
public class UserFormRepository implements UserRepository{

	@Override
	public UserForm insert(UserForm user) {
		return user;
	}

}
