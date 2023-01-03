package com.team1.nbbanfare.repository.mybatis;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

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
	public void insertFollower(FollowerForm follwerForm) {
		followerMapper.insertFollower(follwerForm);
	}
}
