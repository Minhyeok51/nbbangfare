package com.team1.nbbanfare.dto;

public interface NpPayResponseCode {
	int RESULT_CODE_SUCCESS = 200;
	int RESULT_CODE_FAILED = 900;
	
	String RESULT_STATUS_PAID = "paid";
	
	String RESULT_MSG_NOT_ENOUGH_BALANCE = "잔액이 부족합니다.";
	String RESULT_MSG_SUCCESS_PAID = "결제 금액 일치";
	String RESULT_MSG_FAILED_PAID = "결제 금액 불일치";
	
	
}
