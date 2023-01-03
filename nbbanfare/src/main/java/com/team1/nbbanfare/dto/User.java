package com.team1.nbbanfare.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class User {

	private String userNo;
	private String userEmail;
	private String userPassword;
	private String userName;
	private String userBirth;
	private String userPhone;
	private String userAddress;
	private String userImage;
	private boolean isActive;
}
