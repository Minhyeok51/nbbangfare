package com.team1.nbbanfare;

import org.springframework.boot.SpringApplication;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class NbbanfareApplication {

	public static void main(String[] args) {
		SpringApplication.run(NbbanfareApplication.class, args);
	}

}
