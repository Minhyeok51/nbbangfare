package com.team1.nbbanfare.repository.mybatis;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.team1.nbbanfare.dto.FundingForm;
import com.team1.nbbanfare.dto.PresentForm;
import com.team1.nbbanfare.dto.PurchaseForm;

@Mapper
public interface FundingMapper {
	public Integer insertFunding(FundingForm fundingForm);
	
	public List<FundingForm> selectFunding(FundingForm fundingForm);
	
	public void refundFunding(FundingForm fundingForm);
	
	public List<FundingForm> selectPresentNoSearch(PresentForm present);
	
	public void refundPresentFunding (PresentForm present);
	
	public List<PresentForm> selectPresentFundingFriendName(PresentForm presentForm);
	
	public void puchaseUpdate(PurchaseForm purchaseForm);
}
