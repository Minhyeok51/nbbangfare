package com.team1.nbbanfare.repository.mybatis;

import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.team1.nbbanfare.dto.PresentForm;
import com.team1.nbbanfare.repository.PresentRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Repository
@RequiredArgsConstructor
public class MybatisPresentRepository implements PresentRepository{
	private final PresentMapper presentMapper;

	@Override
	@Transactional
	public PresentForm insertPresent(PresentForm present) {
		presentMapper.insertPresent(present);
		return present;
	}

	@Override
	public List<PresentForm> selectByPresent(PresentForm userNo) {
		// TODO Auto-generated method stub
		List<PresentForm> selpresentList = presentMapper.selectByPresent(userNo);
		return selpresentList;
	}

	@Override
	public List<PresentForm> selectByFriendPresent(PresentForm followerid) {
		// TODO Auto-generated method stub
		List<PresentForm> selFriendPreList = presentMapper.selectByFriendPresent(followerid);
		log.info("repository {}", selFriendPreList);
		return selFriendPreList;
	}

	@Override
	@Transactional
	public void updatePresent(PresentForm presentForm) {
		log.info("present Repository{}",presentForm);
		presentMapper.updatePresent(presentForm);
	}

	@Override
	@Transactional
	public void updateToPurchase(PresentForm presentForm) {
		// TODO Auto-generated method stub
		presentMapper.updateToPurchase(presentForm);
		
	}
}
