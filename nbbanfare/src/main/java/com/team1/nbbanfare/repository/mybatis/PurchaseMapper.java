package com.team1.nbbanfare.repository.mybatis;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.team1.nbbanfare.dto.PurchaseForm;

@Mapper
public interface PurchaseMapper {
	public Integer insertPurchase(PurchaseForm purchaseForm);
	
	public List<PurchaseForm> selectByPurchase(String purchase);
}
