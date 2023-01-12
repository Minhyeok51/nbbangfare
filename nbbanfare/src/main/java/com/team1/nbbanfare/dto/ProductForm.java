package com.team1.nbbanfare.dto;

import java.sql.Date;

import lombok.Data;

@Data
public class ProductForm {
	private String productName;
	private String productPrice;
	private String productImage;
	private String productKind;
	private String productContent;
	private Integer productNo;
	private Date creatDate;
}
