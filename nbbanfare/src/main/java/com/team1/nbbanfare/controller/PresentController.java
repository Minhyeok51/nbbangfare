package com.team1.nbbanfare.controller;

import java.util.List;

import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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
}
