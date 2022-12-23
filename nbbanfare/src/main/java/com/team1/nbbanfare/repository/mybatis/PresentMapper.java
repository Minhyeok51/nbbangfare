package com.team1.nbbanfare.repository.mybatis;

import org.apache.ibatis.annotations.Mapper;

import com.team1.nbbanfare.dto.PresentForm;

@Mapper
public interface PresentMapper {
	public Integer insertPresent(PresentForm present);
}
