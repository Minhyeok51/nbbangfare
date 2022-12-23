package com.team1.nbbanfare.dto;

import java.sql.Date;

import lombok.Data;

@Data
public class PresentForm {
	private Integer presentId;
	private String userName;
	private String productName;
	private String productPrice;
	private Integer presentCount;
	private Date presentDate;
}
