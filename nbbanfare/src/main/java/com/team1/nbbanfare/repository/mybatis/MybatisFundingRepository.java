package com.team1.nbbanfare.repository.mybatis;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.team1.nbbanfare.dto.FundingForm;
import com.team1.nbbanfare.dto.PresentForm;
import com.team1.nbbanfare.dto.PurchaseForm;
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

	@Override
	public void refundFunding(FundingForm fundingform) {
		fundingMapper.refundFunding(fundingform);
	}

	@Override
	public List<FundingForm> selectPresentNoSearch(PresentForm present) {
		List<FundingForm> strList = fundingMapper.selectPresentNoSearch(present);
		return strList;
	}

	@Override
	public void refundPresentFunding(PresentForm present) {
		// TODO Auto-generated method stub
		fundingMapper.refundPresentFunding(present);
	}

	@Override
	public List<PresentForm> selectPresentFundingFriendName(PresentForm presentForm) {
		// TODO Auto-generated method stub
		List<PresentForm> presentFriendList = fundingMapper.selectPresentFundingFriendName(presentForm);
		return presentFriendList;
	}

	@Override
	public void puchaseUpdate(PurchaseForm purchaseForm) {
		// TODO Auto-generated method stub
		fundingMapper.puchaseUpdate(purchaseForm);
		
	}
}
