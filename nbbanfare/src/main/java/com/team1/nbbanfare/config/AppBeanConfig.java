package com.team1.nbbanfare.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.team1.nbbanfare.repository.UserRepository;
import com.team1.nbbanfare.repository.mybatis.MybatisUserRepository;
import com.team1.nbbanfare.repository.mybatis.UserMapper;

import lombok.RequiredArgsConstructor;

@Configuration //설정에 관련된 것
@RequiredArgsConstructor
public class AppBeanConfig {

	private final UserMapper userMapper;
	
	@Bean
	public UserRepository userRepository() {
		return new MybatisUserRepository(userMapper);
	}
	
	
}
