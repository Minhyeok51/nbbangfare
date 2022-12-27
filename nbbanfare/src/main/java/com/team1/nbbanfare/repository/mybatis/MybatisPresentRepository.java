package com.team1.nbbanfare.repository.mybatis;

import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.team1.nbbanfare.dto.PresentForm;
import com.team1.nbbanfare.repository.PresentRepository;

import lombok.RequiredArgsConstructor;

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
	@Transactional
	public List<PresentForm> selectByPresent(PresentForm userNo) {
		// TODO Auto-generated method stub
		List<PresentForm> selpresentList = presentMapper.selectByPresent(userNo);
		return selpresentList;
	}


}
