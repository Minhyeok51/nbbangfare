package com.team1.nbbanfare.repository.mybatis;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.team1.nbbanfare.dto.FundingForm;
import com.team1.nbbanfare.repository.FundingRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Repository
@RequiredArgsConstructor
public class MybatisFundingRepository implements FundingRepository{
	private final FundingMapper fundingMapper;

	@Override
	public FundingForm insertFunding(FundingForm fundingForm) {
		// TODO Auto-generated method stub
		fundingMapper.insertFunding(fundingForm);
		return fundingForm;
	}

	@Override
	public List<FundingForm> selectFunding(FundingForm fundingForm) {
		List<FundingForm> fundingList = fundingMapper.selectFunding(fundingForm);
		return fundingList;
	}
}
