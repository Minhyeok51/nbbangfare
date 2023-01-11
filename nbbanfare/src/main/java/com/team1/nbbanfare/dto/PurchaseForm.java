package com.team1.nbbanfare.dto;

import java.sql.Date;

import lombok.Data;

@Data
public class PurchaseForm {
	private Integer productNo;
	private String userId;
	private Integer presentNo;
	private Integer purchaseNo;
	private String productName;
	private Integer presentCount;
	private Integer productPrice;
	private String purchaseDate;
	private String productImage;
}
