package com.team1.nbbanfare.repository.mybatis;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.team1.nbbanfare.dto.FundingForm;

@Mapper
public interface FundingMapper {
	public Integer insertFunding(FundingForm fundingForm);
	
	public List<FundingForm> selectFunding(FundingForm fundingForm);
}
