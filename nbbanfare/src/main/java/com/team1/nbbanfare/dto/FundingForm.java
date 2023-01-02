package com.team1.nbbanfare.dto;

import lombok.Data;

@Data
public class FundingForm {
	private String merchantUid;
	private String productName;
	private String userNo;
	private String followerId;
	private String userName;
	private String fundingPrice;
	private Integer fundingResult;
}
