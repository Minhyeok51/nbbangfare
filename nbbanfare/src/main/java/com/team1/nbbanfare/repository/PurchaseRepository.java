package com.team1.nbbanfare.repository;

import java.util.List;

import com.team1.nbbanfare.dto.PurchaseForm;

public interface PurchaseRepository {
	public PurchaseForm insertPurchase(PurchaseForm purchaseForm);
	
	public List<PurchaseForm> selectByPurchase(String userNo);
	
	public List<PurchaseForm> selectPurchaseFundingFriendName(PurchaseForm purchaseForm);
}
