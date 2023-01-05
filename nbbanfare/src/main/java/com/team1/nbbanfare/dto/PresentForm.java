package com.team1.nbbanfare.dto;


import java.sql.Date;
import java.time.LocalDate;

import lombok.Data;

@Data
public class PresentForm {
	private Integer presentNo;
	private Integer productNo;
	private String userName;
	private String userBirth; 
	private String userPhone;
	private String userEmail;
	private String userAddress;
	private Date createdate;
	private String productName;
	private String productPrice;
	private String productImage;
	private Integer presentCount;
	private String presentDate;
	private Integer fundingPrice;
	private Integer calculate;
	private String followerid;
	private String userNo;
	private String fundingid;
	private Integer presentresult;
	private Integer reqCnt;
}
