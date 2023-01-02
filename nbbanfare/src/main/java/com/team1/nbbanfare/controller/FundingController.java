package com.team1.nbbanfare.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.exception.IamportResponseException;
import com.team1.nbbanfare.dto.FundingForm;
import com.team1.nbbanfare.repository.FundingRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
public class FundingController {
	private IamportClient api =new IamportClient("8278766856734860", "6yvE5LfCfJqpjPtpaBncHgOKZYU8Hh5TySo3EcQVoMQqzGoGXDr5SWSOKH5rI7R06Skr2BGuFjWLhAiR");
	private final FundingRepository fundingRepository;
//	public FundingController() {
//		this.api = new IamportClient("8278766856734860", "6yvE5LfCfJqpjPtpaBncHgOKZYU8Hh5TySo3EcQVoMQqzGoGXDr5SWSOKH5rI7R06Skr2BGuFjWLhAiR");
//	}
	@PostMapping("/follow/{friendId}")
	public String doPayment(@ModelAttribute FundingForm fundingForm, @PathVariable("friendId") String friendId) throws IamportResponseException, IOException{
		log.info("{}", fundingForm);
		fundingRepository.insertFunding(fundingForm);
		return "sucess";
	}
	
	@GetMapping("/mypage/paylist/{userNo}")
	public List<FundingForm> fundingSelect(@ModelAttribute FundingForm funding, @PathVariable("userNo") String userNo) {
		log.info("결제 리스트 {}", funding);
		List<FundingForm> fundingList = fundingRepository.selectFunding(funding);
		return fundingList;
	}
}
