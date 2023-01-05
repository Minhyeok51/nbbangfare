package com.team1.nbbanfare.controller;

import java.io.IOException;
import java.util.List;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.exception.IamportResponseException;
import com.siot.IamportRestClient.request.CancelData;
import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;
import com.team1.nbbanfare.dto.FundingForm;
import com.team1.nbbanfare.dto.NpPayResponse;
import com.team1.nbbanfare.dto.NpPayResponseCode;
import com.team1.nbbanfare.repository.FundingRepository;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
public class FundingController {
	private IamportClient api = new IamportClient("8278766856734860", "6yvE5LfCfJqpjPtpaBncHgOKZYU8Hh5TySo3EcQVoMQqzGoGXDr5SWSOKH5rI7R06Skr2BGuFjWLhAiR");
	private final FundingRepository fundingRepository;

	@ResponseBody
	@RequestMapping(value="/follow/{imp_uid}")
	public NpPayResponse paymentByImpUid(
			@ModelAttribute FundingForm fundingForm
			, Locale locale
			, HttpSession session
			, @PathVariable(value= "imp_uid") String imp_uid) throws IamportResponseException, IOException
	{		
			IamportResponse<Payment> paymentIamportResponse = api.paymentByImpUid(imp_uid);
			
			NpPayResponse npPayResponse = new NpPayResponse();
			npPayResponse.setPaymentIamportResponse(paymentIamportResponse);
			npPayResponse.setResultCode(NpPayResponseCode.RESULT_CODE_SUCCESS);
			npPayResponse.setResultStatus(NpPayResponseCode.RESULT_STATUS_PAID);
			
			log.info("getAmount:{}", paymentIamportResponse.getResponse().getAmount());
			log.info("getFundingPrice:{}",fundingForm.getFundingPrice());
			//여기서 결제금액 결제요청금액 일치 비교
			//같으면
			int serverPrice = 0;
			serverPrice = paymentIamportResponse.getResponse().getAmount().intValue();
			
			if(serverPrice == Integer.parseInt(fundingForm.getFundingPrice())) {
				npPayResponse.setResultMsg(NpPayResponseCode.RESULT_MSG_SUCCESS_PAID);
				fundingRepository.insertFunding(fundingForm);
			} else {
				npPayResponse.setResultMsg(NpPayResponseCode.RESULT_MSG_FAILED_PAID);
			}
			
//			npPayResponse.getPaymentIamportResponse();
			
			//아니면
//			log.info("response:{}",fundingForm);
//			log.info("getmessage:{}",paymentIamportResponse.getMessage());
//			log.info("getresponse:{}",paymentIamportResponse.getResponse());
			
			return npPayResponse;

	}	
	
	@GetMapping("/mypage/paylist/{userNo}")
	public List<FundingForm> fundingSelect(@ModelAttribute FundingForm funding, @PathVariable("userNo") String userNo) {
		log.info("결제 리스트 {}", funding);
		List<FundingForm> fundingList = fundingRepository.selectFunding(funding);
		return fundingList;
	}
	@PostMapping("/mypage/paylist/{imp_uid}")
	public IamportResponse<Payment> cancelPaymentByImpUid(@ModelAttribute FundingForm funding, @PathVariable(value="imp_uid") String imp_uid) 
			throws IamportResponseException, IOException {
		CancelData cancel_data = new CancelData(imp_uid, true);
		IamportResponse<Payment> cancelPaymentIamportResponse = api.cancelPaymentByImpUid(cancel_data);
		log.info("결제취소 funding{}"+funding);
		log.info("서버응답 {}",cancelPaymentIamportResponse);
		fundingRepository.refundFunding(funding);
		return cancelPaymentIamportResponse;	
	}
}
