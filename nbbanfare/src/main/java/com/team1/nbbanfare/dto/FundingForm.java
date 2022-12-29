package com.team1.nbbanfare.dto;

import lombok.Data;

@Data
public class FundingForm {
	private String fundingId;
	private String userId;
	private String presentId;
	private String followerId;
	private String fundingPrice;
	private Integer fundingResult;
}
