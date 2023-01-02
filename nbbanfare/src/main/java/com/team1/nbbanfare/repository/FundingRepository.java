package com.team1.nbbanfare.repository;

import java.util.List;

import com.team1.nbbanfare.dto.FundingForm;

public interface FundingRepository {
	public FundingForm insertFunding(FundingForm fundingForm);
	
	public List<FundingForm> selectFunding(FundingForm fundingForm);
}
