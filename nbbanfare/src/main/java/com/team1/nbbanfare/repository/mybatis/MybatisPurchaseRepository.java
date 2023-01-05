package com.team1.nbbanfare.repository.mybatis;

import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.team1.nbbanfare.dto.PurchaseForm;
import com.team1.nbbanfare.repository.PurchaseRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Repository
@RequiredArgsConstructor
public class MybatisPurchaseRepository implements PurchaseRepository{
	private final PurchaseMapper purchaseMapper;

	@Override
	@Transactional
	public PurchaseForm insertPurchase(PurchaseForm purchaseForm) {
		// TODO Auto-generated method stub
		purchaseMapper.insertPurchase(purchaseForm);
		return purchaseForm;
	}

	@Override
	public List<PurchaseForm> selectByPurchase(String purchase) {
		// TODO Auto-generated method stub
		List<PurchaseForm> printPurchase = purchaseMapper.selectByPurchase(purchase);
		log.info("여기?{}",purchase);
		return printPurchase;
	}
}
