package com.team1.nbbanfare.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.team1.nbbanfare.dto.FundingForm;
import com.team1.nbbanfare.dto.PresentForm;
import com.team1.nbbanfare.dto.PurchaseForm;
import com.team1.nbbanfare.repository.FundingRepository;
import com.team1.nbbanfare.repository.PresentRepository;
import com.team1.nbbanfare.repository.PurchaseRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
public class PurchaseControlloer {
	private final PurchaseRepository purchaseRepository;
	private final FundingRepository fundingRepository;
	private final PresentRepository presentRepository;
	
	
	@PostMapping("/mypage/wishproduct/{userNo}")
	public String purchaseInsert(@ModelAttribute PurchaseForm purchaseForm, @ModelAttribute PresentForm presentForm, @PathVariable(value="userNo")String userNo) {
		log.info("구매확정데이터:{}",purchaseForm);
		purchaseRepository.insertPurchase(purchaseForm);
		presentRepository.updateToPurchase(presentForm);
		fundingRepository.puchaseUpdate(purchaseForm);
		return "success";
	}
	
	@GetMapping("/mypage/purlist/{userNo}")
	public List<PurchaseForm> selectByPurchase(@ModelAttribute PurchaseForm purchase, @PathVariable(value="userNo")String userNo) {
		List<PurchaseForm> printPurchase = purchaseRepository.selectByPurchase(userNo);
		log.info("controller여기?:{}",userNo);
		return printPurchase;
	}
} 