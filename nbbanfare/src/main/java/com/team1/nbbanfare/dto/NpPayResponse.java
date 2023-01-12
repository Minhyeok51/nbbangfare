package com.team1.nbbanfare.dto;

import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;

import lombok.Data;

@Data
public class NpPayResponse {

	private int resultCode;
	private String resultMsg;
	private String resultStatus;
	private IamportResponse<Payment> paymentIamportResponse;
}
