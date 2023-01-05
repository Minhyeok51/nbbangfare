package com.team1.nbbanfare.dto;

import java.util.HashMap;

import lombok.Data;

@Data
public class FundingForm {
	private String fundingid;
	private String merchantUid;
	private String productName;
	private String userNo;
	private String followerId;
	private Integer presentId;
	private String userName;
	private String fundingPrice;
	private Integer fundingResult;
//	private HashMap<String, String> response;
	private String status;
}
