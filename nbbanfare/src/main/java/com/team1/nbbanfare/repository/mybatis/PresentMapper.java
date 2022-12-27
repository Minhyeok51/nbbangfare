package com.team1.nbbanfare.repository.mybatis;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.team1.nbbanfare.dto.PresentForm;

@Mapper
public interface PresentMapper {
	public Integer insertPresent(PresentForm present);
	
	public List<PresentForm> selectByPresent(PresentForm userNo);
}
