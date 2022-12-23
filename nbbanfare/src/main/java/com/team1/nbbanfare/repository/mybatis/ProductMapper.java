package com.team1.nbbanfare.repository.mybatis;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.team1.nbbanfare.dto.ProductForm;


@Mapper
public interface ProductMapper {
	public List<ProductForm> selectAll();
	
	public List<ProductForm> selectByKind(String productKind);
}
