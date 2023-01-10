package com.team1.nbbanfare.repository.mybatis;

import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.team1.nbbanfare.dto.FollowerForSearch;
import com.team1.nbbanfare.dto.FollowerForm;
import com.team1.nbbanfare.repository.FollowerRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Repository
@RequiredArgsConstructor
public class MybatisFollowerRepository implements FollowerRepository{
	private final FollowerMapper followerMapper;

	@Override
	@Transactional
	public void insertFollower(FollowerForm followerForm) {
		followerMapper.insertFollower(followerForm);
	}
	
	@Override
	@Transactional
	public FollowerForm selectFollowerById(FollowerForm followerForm) {
		FollowerForm fb = followerMapper.selectFollowerById(followerForm);
		return fb;
	}
	
	@Override
	@Transactional
	public void deleteFollowerById(FollowerForm followerForm) {
		followerMapper.deleteFollowerById(followerForm);
	}

	@Override
	@Transactional
	public List<String> selectFollower(String userId) {
		// TODO Auto-generated method stub
		List<String> followerList = followerMapper.selectFollower(userId);
		log.info("{}",followerList);
		
		return followerList;
	}
}
