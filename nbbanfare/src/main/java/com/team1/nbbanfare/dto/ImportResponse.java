package com.team1.nbbanfare.dto;

import lombok.Data;

@Data
public class ImportResponse {
	private String success;
	private String imp_uid;
	private String pay_method;
	private String merchant_uid;
	private String name;
	private String paid_amount;
	private String currency;
	private String pg_provider;
	private String pg_type;
	private String pg_tid;
	private String apply_num;
	private String buyer_name;
	private String buyer_email;
	private String buyer_tel;
	private String buyer_addr;
	private String buyer_postcode;
	private String status;
	private String paid_at;
	private String receipt_url;
	private String card_quota;
	private String card_number;
//	[pg_type]=payment&response[pg_tid]=T3b4d340003e7c9807f3&response[apply_num]=&response[buyer_name]=onee&response[buyer_email]=25&response[buyer_tel]=01000000000&response[buyer_addr]=%EC%8B%A0%EC%82%AC%EB%8F%99+661-16&response[buyer_postcode]=06018&response[status]=paid&response[paid_at]=1672794962&response[receipt_url]=https:%2F%2Fmockup-pg-web.kakao.com%2Fv1%2Fconfirmation%2Fp%2FT3b4d340003e7c9807f3%2F77089daf3718b01c572fe5424549959b6bcf07f2a2898468515eaead65897161&response[card_quota]=0&response[card_number]= ]. The valid characters are defined in RFC 7230 and RFC 3986
	
}
