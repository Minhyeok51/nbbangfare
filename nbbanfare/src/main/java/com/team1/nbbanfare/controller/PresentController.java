package com.team1.nbbanfare.controller;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.request.CancelData;
import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;
import com.team1.nbbanfare.dto.FundingForm;
import com.team1.nbbanfare.dto.PresentForm;
import com.team1.nbbanfare.dto.ProductForm;
import com.team1.nbbanfare.repository.FundingRepository;
import com.team1.nbbanfare.repository.PresentRepository;
import com.team1.nbbanfare.repository.ProductRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
public class PresentController {
	private final PresentRepository presentRepository;
	private final FundingRepository fundingRepository; 
	private IamportClient api = new IamportClient("8278766856734860", "6yvE5LfCfJqpjPtpaBncHgOKZYU8Hh5TySo3EcQVoMQqzGoGXDr5SWSOKH5rI7R06Skr2BGuFjWLhAiR");
	@PostMapping("/ItemDetail/{productNo}")
	public String presentInsert(@ModelAttribute PresentForm present, @PathVariable("productNo") int productNo) {
		presentRepository.insertPresent(present);
		log.info("{}", present);
		return "success";
	}

	@GetMapping("/mypage/wishproduct/{userNo}")
	public List<PresentForm> presentSelectById(@ModelAttribute PresentForm present, @PathVariable("userNo") String userNo) {
		if(present.getReqCnt() == 1) {
			List<PresentForm> printPresentList = presentRepository.selectByPresent(present);
			log.info("presentPage Print : {}", printPresentList); 	
			return printPresentList;	
		} else if(present.getReqCnt() == 2) {
			log.info("present{}",present);
			List<PresentForm> printFundingUserList = fundingRepository.selectPresentFundingFriendName(present);
			log.info("펀딩유저들:{}",printFundingUserList);
			return printFundingUserList;
		} else {
			return null;
		}
	}
//	@Mapping("/mypage/wishproduct/{userNo}")
	
	@GetMapping("/follow/{followerid}")
	public List<PresentForm> selectByFriendPresent(@ModelAttribute PresentForm present, @PathVariable("followerid") String followerid) {
		List<PresentForm> printFriendPreList = presentRepository.selectByFriendPresent(present);
		log.info("fcon1{}",present);
		log.info("controller {}", printFriendPreList);
		return printFriendPreList;
	}
	@PutMapping("/mypage/wishproduct/{userNo}") 
		public IamportResponse<Payment> cancelPaymentByImpUid(@ModelAttribute PresentForm present, @PathVariable("userNo") String userNo) {
			log.info("present:{}",present);
			presentRepository.updatePresent(present);
			List<String> strlist = fundingRepository.selectPresentNoSearch(present);
			List<String> impList = new ArrayList<String>();
			ObjectMapper mapper = new ObjectMapper();
			String jsonStr = null;
			try {
				jsonStr = mapper.writeValueAsString(strlist);
				log.info("jsonStr:{}",jsonStr);
				JSONParser parser = new JSONParser();
				JSONArray jsonArr = (JSONArray) parser.parse(jsonStr);
				for(int i = 0; i<jsonArr.size(); i++) {
					JSONObject jObj = (JSONObject) jsonArr.get(i);
					System.out.println(jObj.get("fundingid"));
					String str = (String) jObj.get("fundingid");
					impList.add(str);
				}	
				for(int j = 0; j<impList.size(); j++) {
					CancelData cancel_data = new CancelData(impList.get(j), true);
					IamportResponse<Payment> cancelPaymentIamportResponse = api.cancelPaymentByImpUid(cancel_data);
					log.info("서버응답 {}",cancelPaymentIamportResponse);
					fundingRepository.refundPresentFunding(present);
				}
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			return null;
	}
 }
