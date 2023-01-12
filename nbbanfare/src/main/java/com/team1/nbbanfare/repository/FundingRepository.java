package com.team1.nbbanfare.repository;

import java.util.List;

import com.team1.nbbanfare.dto.FundingForm;
import com.team1.nbbanfare.dto.PresentForm;
import com.team1.nbbanfare.dto.PurchaseForm;


public interface FundingRepository {
	public FundingForm insertFunding(FundingForm fundingForm);
	
	public List<FundingForm> selectFunding(FundingForm fundingForm);
	
	public void refundFunding(FundingForm fundingForm);
	
	public List<FundingForm> selectPresentNoSearch(PresentForm present);
	
	public void refundPresentFunding (PresentForm present);
	
	public List<PresentForm> selectPresentFundingFriendName(PresentForm presentForm);
	
	public void puchaseUpdate(PurchaseForm purchaseForm);
}