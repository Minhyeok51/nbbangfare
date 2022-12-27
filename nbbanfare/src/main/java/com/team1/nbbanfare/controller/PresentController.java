package com.team1.nbbanfare.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.team1.nbbanfare.dto.PresentForm;
import com.team1.nbbanfare.dto.ProductForm;
import com.team1.nbbanfare.repository.PresentRepository;
import com.team1.nbbanfare.repository.ProductRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
public class PresentController {
	private final PresentRepository presentRepository;
	@PostMapping("/ItemDetail/{productNo}")
	public String presentInsert(@ModelAttribute PresentForm present, @PathVariable("productNo") int productNo) {
		presentRepository.insertPresent(present);
		log.info("{}", present);
		return "success";
	}

	@GetMapping("/mypage/{userNo}")
	public List<PresentForm> presentSelectById(@ModelAttribute PresentForm present, @PathVariable("userNo") String userNo) {
		List<PresentForm> printPresentList = presentRepository.selectByPresent(present);
		log.info("presentPage Print : {}", printPresentList);
		return printPresentList;
	}
}
